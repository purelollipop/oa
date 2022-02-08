import {sql} from '../../sql/sql_line'
// let sql = require('../sql/sql_line')
let sqlStr = {
    login: 'SELECT * FROM ONE'
}
const getObj = {
    login:async function(sqlStr:string,fun:()=>any){
        return new Promise((res:any,reject)=>{
            sql.query('SELECT * FROM ONE',(error:any, results:Record<string, any>[], fields:any)=>{
                if(error) return reject(error)
                res(results)
            })
        })
    },
    getData2:function(sqlStr:string){
        sql.query(sqlStr,(error:any, results:Record<string, any>[], fields:any)=>{
            console.log(results)
        })
    }
};

exports.getObj = getObj
