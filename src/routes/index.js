const express = require("express")
const router = express.Router()

/* ===== Home Route ===== */
const HomeController = require("../controllers/HomeController")
router.get("/", HomeController.index)

/* ===== Todos Route ===== */
const todos = require("./todos")
router.use("/todos", todos)

module.exports = router
