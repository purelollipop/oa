let serve = require('./src/middleware/serve')
let route = require('./src/route/route.ts')
let connection = require('./src/sql/sql_line')
let fs =  require('fs')
import { readdir } from 'fs/promises';

fs.readFile('dist',(err,data)=>{
    try {
        if( err ) {
            throw err
        }else {
            serve.serve(route.route)
        };
    } catch (err){
        // fs.writeFile()
        async function readFil(){
            let a = await readdir('web/dist')
            console.log(a)
            return a
        }
        readFil()
    }
})



