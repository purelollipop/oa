import {fsReadFile} from "ts-loader/dist/utils";
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
    switch (url){
        case '/' :
            return await getFile('./dist/index.html').then(res=>{
                return res
            })
        case '/get': {
            let sqlStr = 'SELECT * FROM ONE'
            return await findFun(sqlStr).then(res=>{
                return(res)
            })
        }
        case '/post':
            let sqlStr = 'SELECT * FROM thre'
            return await findFun(sqlStr).then(res=>{
                return(res)
            })
        case 'getData2':{
            let sqlStr = 'SELECT * FROM ONE'
            let d = sql.getData(sqlStr,(error:any, results:Record<string, any>[], fields:any)=>{
                return results
            })
            return ` ${url} ${method}`
        }
        default:
            return await getFile('./dist/index.html').then(res=>{
                return res
            })
    }
}

exports.route = route
