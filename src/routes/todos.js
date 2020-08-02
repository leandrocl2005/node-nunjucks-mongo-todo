const express = require("express")
const router = express.Router()
const { ObjectID } = require("mongodb")

const Todos = () => require("../model/todos")
const { connectionTest } = require("../db/database")

router.get("/status/check", (_req, res, next) => {
    connectionTest().then(status => {
        const [statusCode, statusMessage] = status ? [200, "OK"] : [400, "ERROR"]
        res.status(statusCode).send("Database status: " + statusMessage)
    }, next)
})

router.get("/", (_req, res, next) => {
    Todos()
        .find()
        .then(todos => {
            res.render("todos", { todoList: todos })
        }, next)
})

router.post("/", (req, res, next) => {
    const { title } = req.body
    const todo = {
        title,
        status: "undone",
    }
    Todos()
        .create(todo)
        .then(_response => {
            res.redirect("/todos")
        }, next)
})

router.put("/", (req, res, next) => {
    Todos()
        .updateOne(
            { _id: ObjectID(req.body._id) },
            { $set: { status: req.body.status } },
            { upsert: true }
        )
        .then(_response => res.redirect("/todos"), next)
})

router.delete("/", (req, res, next) => {
    Todos()
        .deleteOne({ _id: ObjectID(req.body._id) }, { justOne: true })
        .then(_response => res.redirect("/todos"), next)
})

module.exports = router
