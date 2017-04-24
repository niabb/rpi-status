# rpi-status
Generate an object with information and statuses of a running Raspberry Pi (including its serial number).

## Command line
You can get the stringified object directly from the command line:

    npm install rpi-status
    node node_modules/rpi-status

You will get something like this:

    {"hostname":"myRPI","uptimeSince":"2017-02-09T09:50:38.000Z","uptimeSeconds":5624934,"dateTime":"2017-01-29T21:26:58.105Z","os":"Linux arm 4.4.38-v7+","freememBytes":522522624,"totalmemBytes":970477568,"loadavg":[0.03564453125,0.03662109375,0.046875],"serialNumber":"00000000fddddddd","cpuTemp":59.61}

## Node.js module
You can use this module in one of your project:

    'use strict';
    const rpiStatus = require('rpi-status');

    console.log(rpiStatus.getSerialNumber());
    rpiStatus.getAll().then((result) => {
    	console.log(result);
    });






