let serve = require('./src/middleware/serve')
let route = require('./src/route/route.ts')
let connection = require('./src/sql/sql_line')
let fs =  require('fs')
import { readdir } from 'fs/promises';

fs.readdir('./dist',(err,data)=>{
    try {
        if( err ) {
            throw err
        }else {
            serve.serve(route.route)
        };
    } catch (err){
        // fs.writeFile()
        async function readFil(){
            return new Promise((res,req)=>{
                res(readdir('web/dist'))
            })
        }
        readFil().then(res=>{
            fs.mkdir('./dist',(err)=>{
                console.log(err)
            })
            for (let i = 0; i < res.length; i++) {
                let read = fs.createReadStream(`web/dist/${res[i]}`)
                let write = fs.createWriteStream(`./dist/${res[i]}`)
                read.pipe(write)
            }
            let read = fs.createReadStream(`web/assets/favicon.ico`)
            let write = fs.createWriteStream(`./dist/favicon.ico`)
            read.pipe(write)
            serve.serve(route.route)
        })
    }
})



