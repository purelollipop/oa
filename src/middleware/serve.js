import {log} from "nodemon/lib/utils";

let http = require('http')
let {URL} =  require('url')
let fs =  require('fs')
// let qs =  require('qs')
let path =  require('path')
var mime = require('mime-types')
// let url =  require('url')
import url,{ URL }  from 'url';
let querystring = require('querystring');
let getObj = require('../api/get/get_api.ts')
const { Readable } = require('stream');

function serve(route){
    function onRequest(req,resolve){
        // let readable = new Readable()
        // readable.setEncoding('utf-8')
        resolve.setHeader("Access-Control-Allow-Origin", "*");
        resolve.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        resolve.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        resolve.setHeader("Access-Control-Allow-Headers","Content-Type, X-Requested-With, Cache-Control,Authorization");
        let pathName = req.url
        const myUrl = new URL(pathName,'http://127.0.0.1:8082')
        const myUrlsearchParams = myUrl.searchParams
        // console.log(pathName)
        let postData = '';
        req.on('data',(chunk)=>{
            postData += chunk
        })
        req.on('end', function () {
            var postObjc = querystring.parse(postData);
        })

        try {
            if(pathName.indexOf('/api') === 0){
                resolve.writeHead(200, {'Content-Type': 'application/json'});
                route(req).then(res=>{
                    resolve.end(JSON.stringify(res))
                })
            } else {
                if(pathName==='/'|| pathName === '/login'){
                    resolve.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    route(req).then(res=>{
                        resolve.end(res)
                    })
                }else{
                    let d = path.extname(pathName)
                    d = mime.lookup(d)
                    resolve.writeHead(200, {'Content-Type': d});
                    let b = fs.readFileSync(`./dist${pathName}`)
                    resolve.end(b)
                }
            }
        }catch (err){
            // resolve.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            // resolve.end(err)
            console.log(err)
            resolve.end('404')
        }
    }
    http.createServer(onRequest).listen(8082)
    console.log('服务开启')
}
exports.serve = serve
