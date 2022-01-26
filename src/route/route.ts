let sql = require('../sql/sql_line')
import fs from 'fs'
async function findFun(sqlStr:string){
    return await sql.getData(sqlStr)
}
async function getFile(urlStr:string){
    return new Promise((resolve,reject)=>{
        fs.readFile(urlStr,'utf-8',(err,data)=>{
            if(err){
                throw err
            };
            return resolve(data)
        })
    })
}
async function route(val:any):Promise<any>{
    let {url,method} = val
    if(url === '/'){
        return await getFile('./dist/index.html').then(res=>{
            return res
        })
    }
    console.log(method)
    switch (method){
        case 'GET': {
            let sqlStr = 'SELECT * FROM ONE'
            return await findFun(sqlStr).then(res=>{
                return(res)
            })
        }
        case 'post':
            let sqlStr = 'SELECT * FROM thre'
            return await findFun(sqlStr).then(res=>{
                return(res)
            })
        default:
            return await getFile('./dist/index.html').then(res=>{
                return res
            })
    }

}

exports.route = route
