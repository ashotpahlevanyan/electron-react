import React from 'react';
import noble from 'noble';
var bindings = require('./references/noble-master/lib/resolve-bindings')();


export default new noble(bindings);