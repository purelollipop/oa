import {sql} from '../../sql/sql_line'
// let sql = require('../sql/sql_line')

interface sqlType{
    login:string
}
let sqlStr:sqlType = {
    login: 'SELECT * FROM user'
}
const getObj = {
    userList:async function():Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`SELECT * FROM user`,(error:any, results:Record<string, any>[], fields:any)=>{
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
    bookList:async function(sqlStr:string){
        return new Promise((res:any,reject)=>{
            sql.query('SELECT * FROM book',(error:any, results:Record<string, any>[], fields:any)=>{
                if(error) return reject(error)
                res(results)
            })
        })
    },
    get:async function (sqlStr:string){
        return new Promise((res:any,reject)=>{
            sql.query('SELECT * FROM ONE',(error:any, results:Record<string, any>[], fields:any)=>{
                if(error) return reject(error)
                res(results)
            })
        })
    }
};

exports.getObj = getObj
