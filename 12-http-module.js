
const http = require('http');

const server = http.createServer((req,res) => {

    if(req.url === '/'){
        res.end("welcome to my world!");
    }
    if(req.url === '/about'){
        res.end("here is my world!");
    }
    res.end(`
    
    <h2>lol try something awsome</h2>
        
    <a href = "/"> back home </a>`)

})

server.listen(5001);