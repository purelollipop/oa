let serve = require('./src/middleware/serve')
let route = require('./src/route/route.ts')
let connection = require('./src/sql/sql_line')

serve.serve(route.route)

