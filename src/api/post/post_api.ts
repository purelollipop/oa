import {sql} from '../../sql/sql_line'
const {createCipheriv,scrypt, randomFill} = require('crypto');
interface results{
    warningCount:number
    changedRows:number
    message:string
    affectedRows:number
    // [k in string]?:any
}

const postObj = {
    login:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            sql.query(
                `SELECT * FROM user where username = '${data.name}'`,
                (error:any, results:Record<string, any>[], fields:any)=>{
                if(error) {return reject(error)}
                if(results.length){
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
    addUser:async function(data:any):Promise<any>{
        return new Promise((res:any,reject)=>{
            const algorithm = 'aes-192-cbc';
            scrypt(data.pass, 'salt', 24, (err:any, key:any) => {
                if (err) throw err;
                // 然后，将生成随机的初始化向量
                randomFill(new Uint8Array(16), (err:any, iv:any) => {
                    if (err) throw err;
                    // 一旦有了密钥和 iv，则可以创建和使用加密...
                    const cipher = createCipheriv(algorithm, key, iv);

                    let encrypted = '';
                    cipher.setEncoding('hex');

                    cipher.on('data', (chunk:any) => encrypted += chunk);
                    cipher.on('end', () => console.log(encrypted));

                    cipher.write('some clear text data');
                    cipher.end();
                });
            });
            sql.query(
                `insert into user(username,password)  values('${data.name}', password('${data.pass}'))`,
                (error:any, results:Record<string, any>[], fields:any)=>{
                if(error) {return reject(error)}
                if(results.length){
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
                res({
                    code:0,
                    codeMessage:'操作失败'
                })
            }
            // let studyBorrow:any = null
            if(addResults.code){
                new Promise((resolve,reject)=>{
                    sql.query(
                        `update student set borrow="${data.bookName}" 
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
                sql.query(`select * from student where studentId="${data.borrowNameId}"`,(error:any, results:results, fields:any)=>{
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
            console.log(stud)
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
