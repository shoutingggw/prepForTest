var fs = require('fs');
var 
// fs.readFile('basicConfigure.js', function (err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("configue" + data.toString());
// });

console.log("----------------------------Start to read configuration----------------------------");
const config = JSON.parse(fs.readFileSync('basicConfigure.js'));
const {tenantId, employeeId, userId} = config;
console.log(`tenantId: ${tenantId}; employeeId: ${employeeId}; userId: ${userId}`);
console.log("----------------------------End reading configuration------------------------------");


