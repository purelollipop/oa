import {sql} from '../../sql/sql_line'

interface results{
    warningCount:number
    // [k in string]?:any
}
type results2 = {
    warningCount:number
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
            sql.query(`insert into book (bookName) values('${data.bookName}')`,(error:any, results:results, fields:any)=>{
                if(error) {return reject(error)}
                if(!results.warningCount){
                    res({
                        code:1,
                        codeMessage:'操作成功'
                    })
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
