const {readFileSync, writeFileSync}  = require('fs');

const first = readFileSync('./content/FirstText.txt','utf8');
const second = readFileSync('./content/secondText.txt','utf8');

writeFileSync('./content/resultText.txt', `here is the result: ${first},${second}`, {flag: 'a'})

const {readFile, writeFile}  = require('fs');

//fs-async writes

readFile('./content/FirstText.txt', 'utf8',(err,result)=> {
    if(err) {
        console.log(err)
        return;
    }
        console.log(result)
    

})