const fs = require('fs');

const base64 = fs.readFileSync('../public/img/totoro.jpeg','base64');

console.log(base64);