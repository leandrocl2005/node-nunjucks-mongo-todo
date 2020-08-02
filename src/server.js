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

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})
