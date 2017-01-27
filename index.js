'use strict';

const os = require('os');
const fs = require('fs');

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

function getAll() {
  return {
    hostname:os.hostname(), 
    uptimeSeconds: os.uptime(), 
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