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
    let arrUrl = url.split('/')
    url = arrUrl[arrUrl.length-1]
    if(url === '/'){
        return await getFile('./dist/index.html').then(res=>{
            return res
        })
    }
    console.log(method)
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
            return await getFile('./dist/index.html').then(res=>{
                return res
            })
    }

}

exports.route = route
