const os = require('os');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function getSerialNumber() {
  const content = fs.readFileSync('/proc/cpuinfo', 'utf8').split('\n');
  const isSerialLine = (e) => e.startsWith('Serial') && e.split(':').length;
  const serialLine = content.find(isSerialLine);

  return serialLine ? serialLine.split(':')[1].trim() : '';
}

async function getUptimeSince() {
  const {stdout} = await exec('uptime -s', { encoding: 'utf8' });
  return stdout.length > 1 ? stdout.substr(0, stdout.length - 1) : '';
}

async function isProcessRunning(processName) {
  try {
    const {stdout} = await exec(`pgrep ${processName}`);
    return stdout && stdout !== '';
  } catch (e) {
    return false;
  }
}

async function diskUsage() {
  const {stdout} = await exec('df -h');

  const lines = stdout.split('\n');

  return lines.slice(1)
    .map((line) => line.split(' ').filter((e) => e.length));
}

function shutdown() {
  return exec('shutdown -h now');
}

function restart() {
  return exec('shutdown -r now');
}

async function isConnectedToInternet() {
  const cmd = 'ping -qc 1 duckduckgo.com >/dev/null && echo ok || echo error';
  const {stdout} = await exec(cmd);

  return stdout && stdout.length > 1 && stdout.substr(0, 2) === 'ok';
}

async function getCpuTemperature() {
  const {stdout} = await exec('cat /sys/class/thermal/thermal_zone0/temp');
  if (stdout && stdout.length > 1) {
    return Number(stdout) / 1000;
  }
  return null;
}

async function getAll() {
  const cpuTemp = await getCpuTemperature();
  const uptimeSince = await getUptimeSince();
  const result = {
    hostname: os.hostname(),
    uptimeSince,
    uptimeSeconds: os.uptime(),
    dateTime: new Date(),
    os: `${os.type()} ${os.arch()} ${os.release()}`,
    freememBytes: os.freemem(),
    totalmemBytes: os.totalmem(),
    loadavg: os.loadavg(),
    serialNumber: getSerialNumber(),
    cpuTemp,
  };

  return result;
}

module.exports = {
  diskUsage,
  getAll,
  getSerialNumber,
  isConnectedToInternet,
  isProcessRunning,
  restart,
  shutdown,
};
