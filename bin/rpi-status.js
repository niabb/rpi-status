#!/usr/bin/env node

const { getAll } = require('..');

getAll().then((result) => {
  console.log(JSON.stringify(result, null, 2));
}).catch((err) => {
  console.log(err);
});
