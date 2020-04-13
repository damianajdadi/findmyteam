const fs = require("fs");

const writeLog = (request) => {
    const log = new Date().toLocaleDateString() + "|" + new Date().toLocaleTimeString() + "|" + request.method + "|" + request.path + "\n";
    fs.appendFile('./logs/findMyTeam.log', log, (error) => {
        if (error) throw error;
        console.log('The "data to append" was appended to file!');
    });
}

module.exports = {
    writeLog: writeLog
};