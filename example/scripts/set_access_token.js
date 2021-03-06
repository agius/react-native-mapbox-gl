const fs = require('fs');
const path = require('path');

const accessToken = fs.readFileSync(path.join('./', 'accesstoken'));

if (!accessToken) {
  process.exit(1);
}

const fileContents = `{ "accessToken": "${new String(accessToken).trim()}" }`;
fs.writeFileSync(path.join('./', 'env.json'), fileContents);
