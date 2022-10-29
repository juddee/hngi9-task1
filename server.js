const http = require('http');
require('dotenv').config(); 

const server = http.createServer((req,res)=>{

    if(req.method === 'GET')
    {
        res.writeHead(200,{ 'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            'slackUsername':'juddee',
            'backend': true,
            'age': 23,
            'bio': 'Building technological solutions'
         }));
    }else{
        res.writeHead(404, {'Content-Type':'application/json'});  
        res.end(JSON.stringify({'message':'I can only respond to GET request for now'}));  
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT} `));

