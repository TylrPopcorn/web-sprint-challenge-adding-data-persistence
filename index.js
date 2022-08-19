// start your server here

/*  DEPENDENCIES

    npm init -y
    npx eslint --init (y)
    npm install express
    npm i -D nodemon
    npm i knex
    npm i sqlite3

*/

const server = require("./api/server")
const PORT = process.env.PORT || 6000

server.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT)
})
