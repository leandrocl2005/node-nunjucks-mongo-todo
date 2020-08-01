const express = require("express")
const nunjucks = require("nunjucks")
const bodyParser= require('body-parser')

const methodOverride = require("method-override")

const { MongoClient, ObjectID } = require("mongodb");

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(methodOverride('_method'))
server.use(express.static("public"))
server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server, autoescape: false, nocache: true,
})

MongoClient.connect("mongodb://localhost:27017", {

    useUnifiedTopology: true

}).then(client => {

    const db = client.db('todos');
    const collection = db.collection('todos')

    server.get("/", async function (req, res) {
        try {
            const cursor = await collection.find({})
            const todoList = await cursor.toArray()
            return res.render('index.njk', {todoList})
        } catch(error) {
            console.error(error);
            throw new Error('Error on GET /');
        }
    })

    server.post("/todos", async function(req, res) {

        const {title} = req.body;
        const todo = {
            title,
            status: "undone"
        };
        collection.insertOne(todo).then(result => {
                res.redirect('/')
        }).catch(error => console.error(error))
    })

    server.put("/todos", async function(req, res) {
        collection.updateOne(
            { _id: ObjectID(req.body._id) },
            { $set: {status: req.body.status } },
            { upsert: true }
          )
            .then(result => res.redirect("/"))
            .catch(error => console.error(error))
    })

    server.delete("/todos", async function(req, res) {
        collection.deleteOne(
            { _id: ObjectID(req.body._id) },
            { justOne: true }
         )
         .then(result => res.redirect("/"))
         .catch(error => console.error(error))
    })

}).catch(err => console.error(err) )

server.listen(5000, function () {
    console.log("server is run!")
})
