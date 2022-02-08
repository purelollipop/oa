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

// let sql = mysql.createConnection({
//     host     : 'localhost',
//     port     : '3306',
//     user     : 'admin',
//     password : '123456',
//     database : 'test'
// })
export let sql = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '123456',
    database : 'oa'
})


module.exports = {sql}
// module.exports = {
//     getData,
//     getData2
// }
// // db.query = sql.query
// exports.sql = db
