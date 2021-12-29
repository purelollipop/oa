let http = require('http')
let url =  require('url')
let fs =  require('fs')
let qs =  require('qs')

function serve(route){
    function onRequest(req,resolve){
        resolve.setHeader("Access-Control-Allow-Origin", "*");
        resolve.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        resolve.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        resolve.setHeader("Access-Control-Allow-Headers","Content-Type, X-Requested-With, Cache-Control,Authorization");
        let pathName = req.url
        console.log(req)
        if(pathName==='/' || pathName==='/umi.css' || pathName==='/umi.js'|| pathName==='/login'){
            if(pathName==='/umi.css'){
                resolve.writeHead(200, {'Content-Type': 'text/css'});
            } else if(pathName==='/umi.js'){
                resolve.writeHead(200, {'Content-Type': 'text/javascript'});
            } else {
                resolve.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            }
            route(req).then(res=>{
                resolve.end(res)
            })
        }else{
            // res.setHeader("Content-Type", "application/json;charset=utf-8");
            resolve.writeHead(200, {'Content-Type': 'application/json'});
            route(req).then(res=>{
                resolve.end(JSON.stringify(res))
            })
        }
    }
    http.createServer(onRequest).listen(8082)
    console.log('服务开启')
}
exports.serve = serve
