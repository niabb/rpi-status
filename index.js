'use strict';

const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;

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
  return new Promise((resolve, reject) => {
    exec('uptime -s', {encoding:'utf8'}, (err, stdout/*, stderr*/) => {
      if (err) {
        return reject(err);
      }
      resolve(stdout);
    });
  });
}

function isProcessRunning(processName) {
  return new Promise((resolve, reject) => { 
    exec('pgrep '+processName, (err, stdout, stderr) => {
      let res = false;
      if (err) {
	      if(err.code && err.code === 1) {
          return resolve(res);
        } else {
          return reject(err);
        }
      }
      //console.log(stdout);
      if(stdout && stdout !== '') {
        res = true;
      }
      resolve(res);
    });
  });
}

function diskUsage() {
  return new Promise((resolve, reject) => {
    exec('df -h', (err, stdout/*, stderr*/) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      let lines = stdout.split('\n');
      for(let i=1; i<lines.length;i++) {
        let splittedLine = lines[i].split(' ');
        let cleanedLine = [];
        for(let token of splittedLine) {
          if (token !== '') {
            cleanedLine.push(token);
          }
        }
        lines[i] = cleanedLine;
      }
      lines.shift();
      //console.log(lines);
      resolve(lines);
    });
  });
}

function shutdown() {
  return new Promise((resolve, reject) => {
    exec('shutdown -h now', (err/*, stdout, stderr*/) => {
    //exec('date', (err, stdout, stderr) => {
      if (err) {
        //console.error(err);
        return reject(err);
      }
      //console.log(stdout);
      resolve();
    });
  });
}

function restart() {
  return new Promise((resolve, reject) => {
    exec('shutdown -r now', (err/*, stdout, stderr*/) => {
      //exec('date', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      //console.log(stdout);
      resolve();
    });
  });
}

function isConnectedToInternet() {
  return new Promise((resolve, reject) => {
    exec('ping -qc 1 google.fr >/dev/null && echo ok || echo error', (err, stdout/*, stderr*/) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      //console.error(stdout);
      if(stdout && stdout.length>1 && stdout.substr(0,2)==='ok') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    let result = {
      hostname:os.hostname(),
      uptimeSince: '',
      uptimeSeconds: os.uptime(),
      dateTime: new Date(),
      os:os.type()+ ' '+os.arch()+ ' '+os.release(), 
      freememBytes:os.freemem(), 
      totalmemBytes:os.totalmem(), 
      loadavg:os.loadavg(), 
      serialNumber:getSerialNumber()
    };
    getUptimeSince().then((up) => {
      result.uptimeSince = up;
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}


if(require.main === module) {
  getAll().then((result) => {
    console.log(JSON.stringify(getAll()));
  }).catch((err) => {
    console.log(err);
  });
  
}

module.exports = {getAll, getSerialNumber, isProcessRunning, diskUsage, shutdown, restart, isConnectedToInternet};
