let sql = require('../sql/sql_line')
let {getObj} = require('../api/get/get_api')
import fs from 'fs'
// async function findFun(sqlStr:string){
//     return await sql.getData(sqlStr)
// }
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
    /*if(url === '/' || url === '/login' || url === '/table'){
        return getFile('./dist/index.html').then(res=>{
            return res
        })
    }*/
    // 初次请求为根 / 所以取消首个根要放到初次请求后
    let arrUrl = url.split('/')
    url = arrUrl[arrUrl.length-1]
    if (url){
        switch (method){
            case 'GET': {
                return getObj[url]().then((res:any)=>{
                    console.log(res)
                }).catch((err:any)=>{
                    return err
                })
            }
            case 'post':
            // let sqlStr = 'SELECT * FROM thre'
            // return await findFun(sqlStr).then(res=>{
            //     return(res)
            // })
            default:
                return getFile('./dist/index.html').then(res=>{
                    return res
                })
        }
    }
}

exports.route = route
