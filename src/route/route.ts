let {getObj} = require('../api/get/get_api')
import fs from 'fs'
let querystring = require('querystring');
async function getFile(urlStr:string){
    return new Promise((resolve,reject)=>{
        fs.readFile(urlStr,'utf-8',(err,data)=>{
            if(err){
                throw err
            }
            return resolve(data)
        })
    })
}
async function route(val:any):Promise<any>{
    let {url,method} = val
    console.log(val)
    let arrUrl = url.split('/')
    url = arrUrl[arrUrl.length-1]
    if (url){
        switch (method){
            case 'GET': {
                return getObj[url]().then((res:any)=>{
                    return res
                }).catch((err:any)=>{
                    return err
                })
            }
            case 'POST':
                let data:any = ''
                val.on('data',(chunk:any)=>{
                    data += chunk
                })
                val.on('end',()=>{
                    querystring.parse(data)
                    // console.log('data``',data)
                    return getObj[url](data).then((res:any)=>{
                        return res
                    }).catch((err:any)=>{
                        return err
                    })
                })
            default:
                return getFile('./dist/index.html').then(res=>{
                    return res
                })
        }
    }
}

exports.route = route
