export {}
let mysql = require('mysql')
interface sqlInf{
    query:()=>Record<string, any>[]
}
// let pool   = mysql.createPool({
//     host     : 'localhost',
//     port     : '3306',
//     user     : 'admin',
//     password : '123456',
//     database : 'test'
// });
// pool.getConnection((err:any,connection:any)=>{
//     if (err) throw err;
//     connection.query('SELECT * FROM ONE', function (error:any, results:[], fields:any) {
//         // When done with the connection, release it.
//         // connection.release();
//         console.log(results)
//         // Handle error after the release.
//         if (error) throw error;
//         // Don't use the connection here, it has been returned to the pool.
//     });
// })

let sql = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'admin',
    password : '123456',
    database : 'test'
})
function getData(sqlStr:string,fun:()=>any){
    return new Promise((res:any,rej)=>{
        sql.query(sqlStr,(error:any, results:Record<string, any>[], fields:any)=>{
            res(results)
        })
    })
}
function getData2(sqlStr:string){
    sql.query(sqlStr,(error:any, results:Record<string, any>[], fields:any)=>{
        console.log(results)
    })
}
module.exports = {
    getData,
    getData2
}
// db.query = sql.query
// exports.sql = db
