# rpi-status
Generate an object with information and statuses of a running Raspberry Pi. Basically a wrapper of native OS library functions, plus the SoC Serial Number.

## Command line
You can get the stringified object directly on the command line:

    npm install rpi-status
    node node_modules/rpi-status

You will get something like this:

    {"hostname":"racebox-002","uptimeSeconds":234380,"os":"Linux arm 4.4.38-v7+","freememBytes":522522624,"totalmemBytes":970477568,"loadavg":[0.03564453125,0.03662109375,0.046875],"serialNumber":"00000000fbc768b4"}

## Node.js module
You can use this module in one of your project:

    'use strict';
    const rpiStatus = require('rpi-status');

    console.log(rpiStatus.getSerialNumber());
    console.log(rpiStatus.getAll());





