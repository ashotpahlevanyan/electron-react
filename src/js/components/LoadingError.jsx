import React from 'react';
import { Alert } from 'reactstrap';
import LoadingSpinner from './LoadingSpinner';

export default function({loading, error}) {
	if(loading) {
		return <LoadingSpinner color='info' size='lg'/>
	} else if(error) {
		return <Alert color='danger' className='pinned'>{`Error: ${error.message}`}</Alert>
	} else {
		return '';
	}
}
