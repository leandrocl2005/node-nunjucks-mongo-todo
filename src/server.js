const express = require("express")
const nunjucks = require("nunjucks")
const bodyParser= require('body-parser')
const methodOverride = require("method-override")

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(methodOverride('_method'))
server.use(express.static("public"))

server.set("view engine", "njk")
nunjucks.configure("src/views", {
    express: server, autoescape: false, nocache: true,
})

const routes = require("./routes")
server.use("/", routes)

server.listen(5000, function () {
    console.log("server is run!")
})
