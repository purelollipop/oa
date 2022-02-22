import {sql} from '../../sql/sql_line'
const {createCipheriv,scrypt, randomFill, scryptSync,createCipher,
    createDecipher,
    createDecipheriv,} = require('crypto');
const { Buffer } = require('buffer');

interface results{
    warningCount:number
    changedRows:number
    message:string
    affectedRows:number
    length:number
    // [k in string]?:any
}

const postObj = {
    login:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(
                `SELECT password FROM user where username = '${data.name}'`,
                (error:any, results:Record<string, any>[], fields:any)=>{
                if(error) {return reject(error)}
                if(results.length){
                    const decipherHash = createDecipher('aes-192-cbc', '123')
                    let decrypted = decipherHash.update(results[0].password,'hex',"utf8");
                    decrypted += decipherHash.final('utf8')
                    if(data.pas === decrypted){
                        res({
                            code:1,
                            codeMessage:`操作成功`
                        })
                    }
                }else{
                    res({
                        code:0,
                        codeMessage:`操作失败`
                    })
                }
            })
        })
    },
    addUser:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            const ciph = createCipher('aes-192-cbc', "123")
            let ciphPass = ciph.update(data.pass,"utf8",'hex')
            ciphPass += ciph.final('hex')
            sql.query(
                `insert into user(username,password)  values('${data.name}', '${ciphPass}')`,
                (error:any, results:results, fields:any)=>{
                if(error) {
                    res({
                        code:0,
                        codeMessage:`操作失败${error}`
                    })
                    return
                }
                    console.log(results)
                if(!results.warningCount){
                    res({
                        code:1,
                        codeMessage:`操作成功`
                    })
                }else{
                    res({
                        code:0,
                        codeMessage:`操作失败`
                    })
                }
            })
        })
    },
    deleteUser:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(
                `delete from user where id='${data.id}' and id<>1`,
                (error:any, results:results, fields:any)=>{
                if(error) {
                    res({
                        code:0,
                        codeMessage:`操作失败${error}`
                    })
                    return
                }
                    console.log(results)
                if(!results.warningCount && results.affectedRows){
                    res({
                        code:1,
                        codeMessage:`操作成功`
                    })
                }else{
                    res({
                        code:0,
                        codeMessage:`操作失败`
                    })
                }
            })
        })
    },
    addBook:async function(data:any):Promise<any>{
        if(!data.bookName){
            return({
                code:0,
                codeMessage:"添加失败"
            })
        }
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
                        codeMessage:"添加失败"
                    })
                }
            })
        })
    },
    deleteBook:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(
                `delete from book where bookId='${data.bookId}' 
                 and borrow=0`,(error:any, results:results, fields:any)=>{
                if(error) {return reject(error)}
                    console.log(results)
                if(results.affectedRows){
                    res({
                        code:1,
                        codeMessage:'操作成功'
                    })
                }else{
                    res({
                        code:0,
                        codeMessage:"操作失败"
                    })
                }
            })
        })
    },
    borrowBook:async function(data:any):Promise<any>{
        return new Promise(async (res:any,rej)=>{
            /* 查询学生是否存在 */
            let stud:any = await new Promise((resolve,reject)=>{
                sql.query(
                    `select * from student where studentId="${data.borrowName}"`,
                    (error:any, results:results, fields:any)=>{
                    if(error) {reject(error)}
                    if(!results.warningCount){
                        resolve (results)
                    }else{
                        res({
                            code:0,
                            codeMessage:`'操作失败'${results.message}`
                        })
                    }
                })
            })
            let addResults:any = null
            /* 当学存在 借书 */
            if(stud.length){
                addResults = await new Promise((resolve,reject)=>{
                    sql.query(
                        `update book set borrow=1,
                         borrowName=(select studentName from student 
                         where studentId="${data.borrowName}"),borrowNameId="${data.borrowName}" where bookId="${data.bookId}" 
                         and borrow=0`,(error:any, results:results, fields:any)=>{
                        if(error) {return reject(error)}
                        if(!results.changedRows){
                            resolve({
                                code:0,
                                codeMessage:`'操作失败'${results.message}`
                            })
                        }else if(!results.warningCount){
                            resolve({
                                code:1,
                                codeMessage:'操作成功'
                            })
                        }else{
                            resolve({
                                code:0,
                                codeMessage:`'操作失败'${results.message}`
                            })
                        }
                    })
                })
            }else{
                addResults = {
                    code:0,
                    codeMessage:'操作失败'
                }
                res(addResults)
            }
            // let studyBorrow:any = null
            if(addResults.code){
                new Promise((resolve,reject)=>{
                    sql.query(
                        `update student set borrow=(select bookName from book where bookId="${data.bookId}") 
                         where studentId="${data.borrowName}"`,
                        (error:any, results:results, fields:any)=>{
                        if(error) {reject(error)}
                        if(!results.warningCount){
                            res ({
                                code:1,
                                codeMessage:'操作成功'
                            })
                        }else{
                            res({
                                code:0,
                                codeMessage:`'操作失败'${results.message}`
                            })
                        }
                    })
                })
            }else{
                res({
                    code:0,
                    codeMessage:'操作失败'
                })
            }
        })
    },
    resetBook:async function(data:any):Promise<any>{
        return new Promise(async (res:any,rej)=>{
            /* 先获取人物是否存在 */
            let stud:any = await new Promise((resolve,reject)=>{
                sql.query(`select borrow from student where exists(SELECT * FROM student 
                           WHERE studentId="${data.borrowNameId}") and studentId="${data.borrowNameId}"`,
                    (error:any, results:results|any[], fields:any)=>{
                    if(error) {reject(error)}
                    if(results.length){
                        let a:any[] = (results as any[])[0].borrow.split(',')
                        for (let i = 0; i < a.length; i++) {
                            if(data.bookName === a[i]){
                                a.splice(i,1)
                                break
                            }
                        }
                       let b:string = a.toString()
                        sql.query(`update student set borrow="${b}" where studentId="${data.borrowNameId}"`)
                        resolve (results)
                    }else{
                        stud = {
                            code:0,
                            codeMessage:`'操作失败'${(results as results).message}`
                        }
                        res(stud)
                    }
                })
            })
            if(stud.length){
                await new Promise((resolve,reject)=>{
                    sql.query(
                        `update book set borrow=0,
                         borrowName=null,
                         borrowNameId=null where bookId=${data.bookId}`,
                        (error:any, results:results, fields:any)=>{
                        if(error) {
                            res({
                                code:0,
                                codeMessage:error.sqlMessage
                            })
                            return
                        }
                        if(!results.warningCount){
                            res({
                                code:1,
                                codeMessage:'操作成功'
                            })
                        }else{
                            res({
                                code:0,
                                codeMessage:`'操作失败'${results.message}`
                            })
                        }
                    })
                })
            }else{
                res({
                    code:0,
                    codeMessage:'操作失败'
                })
            }
        })
    },
    addStudent:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`insert into student (studentName) values('${data.studentName}')`,(error:any, results:results, fields:any)=>{
                if(error) {return reject(error)}
                if(!results.warningCount){
                    res({
                        code:1,
                        codeMessage:'操作成功'
                    })
                }else{
                    res({
                        code:0,
                        codeMessage:"操作失败"
                    })
                }
            })
        })
    },
    deleteStudent:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(`delete from student where studentId=${data.studentId} and borrow is Null`,(error:any, results:results, fields:any)=>{
                if(error) {
                    res({
                        code:0,
                        codeStr:error
                    })
                    return reject(error)
                }
                if(!results.warningCount){
                    res({
                        code:1,
                        codeMessage:'操作成功'
                    })
                }else{
                    res({
                        code:0,
                        codeStr:error
                    })
                }
            })
        })
    },
};

exports.postObj = postObj
