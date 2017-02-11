'use strict';

const os = require('os');
const fs = require('fs');
const exec = require('child_process').execSync;

function getSerialNumber() {
  const content = fs.readFileSync('/proc/cpuinfo', 'utf8');
  const contentArray = content.split("\n");
  for(let line of contentArray) {
    if (line.startsWith('Serial')) {
      const serialLine = line.split(':');
      if(serialLine.length > 1) {
        return serialLine[1].trim();
      }
    }
  }
  return '';
}

function getUptimeSince() {
  return new Date(exec('uptime -s', {encoding:'utf8'}));
}

function getAll() {
  return {
    hostname:os.hostname(),
    uptimeSince: getUptimeSince(),
    uptimeSeconds: os.uptime(),
    dateTime: new Date(),
    os:os.type()+ ' '+os.arch()+ ' '+os.release(), 
    freememBytes:os.freemem(), 
    totalmemBytes:os.totalmem(), 
    loadavg:os.loadavg(), 
    serialNumber:getSerialNumber()
  };
}


if(require.main === module) {
  console.log(JSON.stringify(getAll()));
}

module.exports = {getAll, getSerialNumber};