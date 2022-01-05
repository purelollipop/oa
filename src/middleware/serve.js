import {log} from "nodemon/lib/utils";

let http = require('http')
let url =  require('url')
let fs =  require('fs')
let qs =  require('qs')
let path =  require('path')
var mime = require('mime-types')
// let url =  require('url')
import url,{ URL }  from 'url';
function serve(route){
    function onRequest(req,resolve){
        resolve.setHeader("Access-Control-Allow-Origin", "*");
        resolve.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        resolve.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        resolve.setHeader("Access-Control-Allow-Headers","Content-Type, X-Requested-With, Cache-Control,Authorization");
        let pathName = req.url
        console.log(pathName)
        if(pathName.indexOf('api') === 0){
            resolve.writeHead(200, {'Content-Type': 'application/json'});
            route(req).then(res=>{
                resolve.end(JSON.stringify(res))
            })
        } else {
            if(pathName==='/'){
                resolve.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                route(req).then(res=>{
                    resolve.end(res)
                })
            }else{
                let d = path.extname(pathName)
                d = mime.lookup(d)
                resolve.writeHead(200, {'Content-Type': d});
                let b = fs.readFileSync(`./web/dist${pathName}`)
                resolve.end(b)
            }
        }
    }
    http.createServer(onRequest).listen(8082)
    console.log('服务开启')
}
exports.serve = serve
