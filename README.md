# rpi-status

NodeJs module to provide a simple interface with your Raspberry Pi.

The base motivation was to get a json object populated with system
information.

## CLI

You can get the stringified object directly from the command line:


```bash
    npm i -g rpi-status
    rpi-status
```

You will get something like this:

```json
  {
    "hostname": "myRPI",
    "uptimeSince": "2017-02-09T09:50:38.000Z",
    "uptimeSeconds": 5624934,
    "dateTime": "2017-01-29T21:26:58.105Z",
     "os": "Linux arm 4.4.38-v7+",
     "freememBytes": 522522624,
     "totalmemBytes": 970477568,
     "loadavg": [
        0.03564453125,
        0.03662109375,
        0.046875
     ],
     "serialNumber": "00000000fddddddd",
    "cpuTemp": 59.61
  }
```

## API

Check the API in <lib/lib.js>. Documentation is being developed.

You can use this module in one of your projects:

```javascript
    const rpiStatus = require('rpi-status');

    console.log(rpiStatus.getSerialNumber());
    rpiStatus.getAll().then((result) => {
        console.log(result);
    });
```

## LICENSE

```text
MIT License

Copyright (c) 2017 niabb
Copyright (c) 2021 cpmachado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
