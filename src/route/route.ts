let {getObj} = require('../api/get/get_api')
let {postObj} = require('../api/post/post_api')
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
    try{
        let {url,method} = val
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
                    return new Promise((resolve,reject)=>{
                        let data:any = ''
                        // if (val.headers["content-type"] === 'application/json;charset=UTF-8') {
                        //     // data = []
                        //     console.log('js')
                        //     val.on('data',(chunk:any)=>{
                        //         console.log(123)
                        //         // console.log(chunk)
                        //         data.push(chunk)
                        //     })
                        // } else {
                        //
                        // }
                        val.on('data',(chunk:any)=>{
                            data += chunk
                        })
                        val.on('end',()=>{
                            querystring.parse(data)
                            if (data) {
                                try{
                                    data = JSON.parse(data)
                                    return postObj[url](data).then((res:any)=>{
                                        resolve(res)
                                    }).catch((err:any)=>{
                                        reject(err)
                                    })
                                }catch (err){
                                    reject({
                                        code:0,
                                        codeStr:`err${err}`
                                    })
                                }
                            } else {
                                resolve({
                                    code:0,
                                    codeStr:'no'
                                })
                            }
                        })
                    })
                default:
                    return {
                        code:0,
                        codeStr:'no methods'
                    }
            }
        }
    }catch (err:any){
        console.log('route')
        throw new Error(err)
    }
}

exports.route = route
