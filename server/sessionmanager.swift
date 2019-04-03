//
//  EASessionManager.swift
//  TagMax
//
//  Created by Sargis on 1/13/19.
//  Copyright © 2019 CattleTags. All rights reserved.
//

import UIKit
import ExternalAccessory

class EASessionManager: NSObject, EAAccessoryDelegate, StreamDelegate {

    //MARK: Shared Instance
    static let shared: EASessionManager = {
        let instance = EASessionManager()
        return instance
    }()

    var accessory: EAAccessory?
    var session: EASession?
    var protocolString: String?
    var writeDataObj: NSMutableData?
    var readDataObj: NSMutableData?
    var dataAsString: String?
    var dataAsHexString: String?

    private override init() {}

    // MARK: Controller Setup

    func setupController(forAccessory accessory: EAAccessory, withProtocolString protocolString: String) {
        self.accessory = accessory
        self.protocolString = protocolString
    }

    // MARK: Opening & Closing Sessions

    @discardableResult func openSession() -> Bool {
        self.accessory?.delegate = self
        self.session = EASession(accessory: self.accessory!, forProtocol: self.protocolString!)

        if self.session != nil {
            self.session?.inputStream?.delegate = self
            self.session?.inputStream?.schedule(in: RunLoop.current, forMode: RunLoop.Mode.default)
            self.session?.inputStream?.open()

            self.session?.outputStream?.delegate = self
            self.session?.outputStream?.schedule(in: RunLoop.current, forMode: RunLoop.Mode.default)
            self.session?.outputStream?.open()
        } else {
            print("Failed to create session")
        }

        return self.session != nil
    }

    func closeSession() {
        self.accessory?.delegate = nil
        self.session?.inputStream?.close()
        self.session?.inputStream?.remove(from: RunLoop.current, forMode: RunLoop.Mode.default)
        self.session?.inputStream?.delegate = nil

        self.session?.outputStream?.close()
        self.session?.outputStream?.remove(from: RunLoop.current, forMode: RunLoop.Mode.default)
        self.session?.outputStream?.delegate = nil

        self.session = nil
        self.writeDataObj = nil
        self.readDataObj = nil
    }

    // MARK: Write & Read Data

    func writeData(data: Data) {
        if self.writeDataObj == nil {
            self.writeDataObj = NSMutableData()
        }

        self.writeDataObj?.append(data)
        self.writeData()
    }

    func readData(bytesToRead: Int) -> Data {

        var data: Data?
        if (self.readDataObj?.length)! >= bytesToRead {
            let range = NSMakeRange(0, bytesToRead)
            data = self.readDataObj?.subdata(with: range)
            self.readDataObj?.replaceBytes(in: range, withBytes: nil, length: 0)
        }

        return data!
    }

    func readBytesAvailable() -> Int {
        return (self.readDataObj?.length)!
    }

    // MARK: - Helpers
    func updateReadData() {
        let bufferSize = 128
        var buffer = [UInt8](repeating: 0, count: bufferSize)

        while self.session?.inputStream?.hasBytesAvailable == true {
            let bytesRead = self.session?.inputStream?.read(&buffer, maxLength: bufferSize)
            if self.readDataObj == nil {
                self.readDataObj = NSMutableData()
            }
            self.readDataObj?.append(buffer, length: bytesRead!)
            self.dataAsString = NSString(bytes: buffer, length: bytesRead!, encoding: String.Encoding.utf8.rawValue) as String?
            if self.readDataObj?.length ?? 0 > 16{
                NotificationCenter.default.post(name: NSNotification.Name.SessionDataDidReceived, object: self)
                print("Record new scan")
            }
        }
    }

    private func writeData() {
        while (self.session?.outputStream?.hasSpaceAvailable)! == true && self.writeDataObj != nil && (self.writeDataObj?.length)! > 0 {
            var buffer = [UInt8](repeating: 0, count: self.writeDataObj!.length)
            self.writeDataObj?.getBytes(&buffer, length: (self.writeDataObj?.length)!)
            let bytesWritten = self.session?.outputStream?.write(&buffer, maxLength: self.writeDataObj!.length)
            if bytesWritten == -1 {
                print("Write Error")
                return
            } else if bytesWritten! > 0 {
                self.writeDataObj?.replaceBytes(in: NSMakeRange(0, bytesWritten!), withBytes: nil, length: 0)
            }
        }
    }

    // MARK: - EAAcessoryDelegate

    func accessoryDidDisconnect(_ accessory: EAAccessory) {
        // Accessory diconnected from iOS, updating accordingly
    }

    // MARK: - NSStreamDelegateEventExtensions

    func stream(_ aStream: Stream, handle eventCode: Stream.Event) {
        switch eventCode {
        case Stream.Event.openCompleted:
            break
        case Stream.Event.hasBytesAvailable:
            // Read Data
            updateReadData()
            break
        case Stream.Event.hasSpaceAvailable:
            // Write Data
            self.writeData()
            break
        case Stream.Event.errorOccurred:
            break
        case Stream.Event.endEncountered:
            break

        default:
            break
        }
    }
}
