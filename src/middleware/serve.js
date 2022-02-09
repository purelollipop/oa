import {log} from "nodemon/lib/utils";

let http = require('http')
let {URL} =  require('url')
let fs =  require('fs')
import { readFile  } from 'fs/promises';
// let qs =  require('qs')
let path =  require('path')
var mime = require('mime-types')
// let url =  require('url')
import url,{ URL }  from 'url';
let querystring = require('querystring');
let getObj = require('../api/get/get_api.ts')
const { Readable } = require('stream');
async function getFile(urlStr){
    return new Promise((resolve,reject)=>{
        fs.readFile(urlStr,'utf-8',(err,data)=>{
            if(err){
                throw err
            }
            return resolve(data)
        })
    })
}
function serve(route){
    async function onRequest(req,resolve){
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
                if(pathName==='/' || pathName.indexOf('.')===-1){
                    resolve.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    let a = await readFile('./dist/index.html').then(res=>{
                        return res
                    })
                    resolve.end(a)
                    // return getFile('./dist/index.html').then(res=>{
                    //     return res
                    // })
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
