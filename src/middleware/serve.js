let http = require('http')
let {URL} =  require('url')
let fs =  require('fs')
import { readFile  } from 'fs/promises';
let path =  require('path')
let mime = require('mime-types')
import url,{ URL }  from 'url';



function serve(route){
    async function onRequest(req,resolve){
        resolve.setHeader("Access-Control-Allow-Origin", "*");
        resolve.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        resolve.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        resolve.setHeader("Access-Control-Allow-Headers","Content-Type, X-Requested-With, Cache-Control,Authorization");
        let pathName = req.url
        try {
            if(pathName.indexOf('/api') === 0){
                let result = await route(req).then(res=>{
                    resolve.writeHead(200, {'Content-Type': 'application/json'});
                    return res
                }).catch(err=>{
                    resolve.writeHead(200, {'Content-Type': 'text/plain'});
                    return {
                        code:0,
                        errStr:JSON.stringify(err.message)
                    }
                })
                resolve.end(JSON.stringify(result))
            } else {
                if(pathName==='/' || pathName.indexOf('.')===-1){
                    resolve.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    let result = await readFile('./dist/index.html').then(res=>{
                        return res
                    }).catch(err=>{
                        return err
                    })
                    resolve.end(result)
                }else{
                    let d = path.extname(pathName)
                    d = mime.lookup(d)
                    resolve.writeHead(200, {'Content-Type': d});
                    let b = fs.readFileSync(`./dist${pathName}`)
                    resolve.end(b)
                }
            }
        }catch (err){
            // resolve.writeHead(200, {'Content-Type': 'application/json'});
            // resolve.end(err)
            resolve.end(err)
        }
    }
    http.createServer(onRequest).listen(8082)
    console.log('服务开启')
}
exports.serve = serve
