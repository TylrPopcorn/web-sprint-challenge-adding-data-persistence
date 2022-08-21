// build your server here and require it from index.js

const express = require("express");
const server = express()

//Routers:
const project_router = require("./project/router")
const task_router = require("./task/router")
const resource_router = require("./resource/router")

server.use(express.json()) //Readable feedback

server.use("/api/projects", project_router)
server.use("/api/tasks", task_router)
server.use("/api/resources", resource_router)

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        //   stack: err.stack,
    })
})

module.exports = server




