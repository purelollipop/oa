let serve = require('./src/middleware/serve')
let route = require('./src/route/route.ts')
let connection = require('./src/sql/sql_line')
let fs =  require('fs')
import { readdir,copyFile } from 'fs/promises';
async function readFil(){
    return new Promise((resolve,req)=>{
        readdir('web/dist').then(res=>{
            // fs.mkdir('./dist',(err)=>{
            //     console.log(err)
            // })
            for (let i = 0; i < res.length; i++) {
                // let read = fs.createReadStream(`web/dist/${res[i]}`)
                // let write = fs.createWriteStream(`./dist/${res[i]}`)
                // read.pipe(write)
                copyFile(`./web/dist/${res[i]}`, `./dist/${res[i]}`)
            }
            let read = fs.createReadStream(`web/assets/favicon.ico`)
            let write = fs.createWriteStream(`./dist/favicon.ico`)
            read.pipe(write)
            resolve()
        })
    })
}
fs.readdir('./dist',(err,data)=>{
    try {
        if( err ) {
            throw err
        }else {
            // let b = fs.access('./dist',(err)=>{
            //     console.log(err)
            // })
            // console.log(b)
            // let a = fs.statSync('./dist')
            // console.log(a)
            // let aa = fs.statSync('./web/dist')
            // console.log(aa)

            readFil()
            serve.serve(route.route)
        };
    } catch (err){
        // fs.writeFile()

        readFil().then(res=>{
            serve.serve(route.route)
        })
    }
})



