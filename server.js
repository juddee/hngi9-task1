const http = require('http');
require('dotenv').config(); 
const Enum  ={
    addition :"addition",
    subtraction :"subtraction",
    multiplication : "multiplication"
};


const server = http.createServer((req,res)=>{

    if(req.url === '/' && req.method === 'GET')
    {
        res.writeHead(200,{ 'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            'slackUsername':'juddee',
            'backend': true,
            'age': 23,
            'bio': 'Building technological solutions'
         }));
    }
    else if(req.url === '/calculate' && req.method === 'POST')
    {

        let body ='';
        req.on('data', (chuck)=>{
            body +=chuck.toString();
        });
        req.on('end', ()=>{
           const {operation_type,x,y} = JSON.parse(body);

            if( Number.isInteger(x) == true &&  Number.isInteger(y) == true){
                if(Enum.addition == operation_type || operation_type.toLowerCase().includes("add") || operation_type.toLowerCase().includes("sum") )
                {
                    var result = x+y;
                        runResponds(result,"addition",res);
                }
                else if (Enum.subtraction == operation_type || operation_type.toLowerCase().includes("minus") || operation_type.toLowerCase().includes("difference") || operation_type.toLowerCase().includes("subtract") )
                {
                    var result = x-y;
                    runResponds(result,"subtraction",res);
                }
                else if (Enum.multiplication == operation_type || operation_type.toLowerCase().includes("times") || operation_type.toLowerCase().includes("multiply") || operation_type.toLowerCase().includes("multiplication") )
                {
                    var result = x*y;
                    runResponds(result,"multiplication",res);
                }
                else{
                    res.writeHead(500, {'Content-Type':'application/json'});  
                    res.end(JSON.stringify(
                        {
                            "slackUsername":"juddee",
                            "message": "Sorry operation not available yet! ... Try addition/subtraction/multiplication"
                        }));
                }
            }else{
                res.writeHead(500, {'Content-Type':'application/json'});  
                res.end(JSON.stringify(
                    {
                        "slackUsername":"juddee",
                        "message": "Opps! X & Y must be integer datatype"
                    }));
            }
        });

    }
    else{
        res.writeHead(200, {'Content-Type':'application/json'});  
        res.end(JSON.stringify({'message':'I can only respond to GET request for now'}));  
    }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT} `));

function runResponds(result,operation,res)
{
    res.writeHead(200, {'Content-Type':'application/json'});  
    res.end(JSON.stringify(
        {
            "slackUsername":"juddee",
            "result": result,
            "operation_type": operation
        }));
}