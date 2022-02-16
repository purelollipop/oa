import {sql} from '../../sql/sql_line'
// let sql = require('../sql/sql_line')

interface sqlType{
    login:string
}
let sqlStr:sqlType = {
    login: 'SELECT * FROM user'
}
const postObj = {
    login:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`SELECT * FROM user where username = '${data.name}'`,(error:any, results:Record<string, any>[], fields:any)=>{
                if(error) {return reject(error)}
                if(results.length){
                    res(results)
                }else{
                    res({
                        code:0,
                        isLogin:false
                    })
                }
            })
        })
    },
    addBook:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`SELECT * FROM user where username = '${data.name}'`,(error:any, results:Record<string, any>[], fields:any)=>{
                if(error) {return reject(error)}
                if(results.length){
                    res(results)
                }else{
                    res({
                        code:0,
                        isLogin:false
                    })
                }
            })
        })
    },
};

exports.postObj = postObj
