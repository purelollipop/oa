import {sql} from '../../sql/sql_line'
// let sql = require('../sql/sql_line')

interface results{
    warningCount:number
    changedRows:number
    message:string
    affectedRows:number
    length:number
    // [k in string]?:any
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
                        codeMessage:`操作失败`
                    })
                }
            })
        })
    },
    getBook:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`SELECT * FROM book`,(error:any, results:results, fields:any)=>{
                if(error) {return reject(error)}
                if(results.length){
                    res(results)
                }else{
                    res({
                        code:0,
                        codeMessage:`操作失败${results.message}`
                    })
                }
            })
        })
    },
    getStudent:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`SELECT * FROM student`,(error:any, results:Record<string, any>[], fields:any)=>{
                if(error) {
                    res({
                        code:0,
                        codeStr:error
                    })
                    return reject(error)
                } else {
                    res({
                        code:1,
                        data:results
                    })
                }
            })
        })
    },
};

exports.getObj = getObj
