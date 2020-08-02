const express = require("express")
const router = express.Router()

/* ===== Home Route ===== */
const HomeController = require("../controllers/HomeController")
router.get("/", HomeController.index)

/* ===== Oscars trailers Route ===== */
router.get("/oscars", (_req, res) => res.render("oscars.njk"))

/* ===== Todos Route ===== */
const todos = require("./todos")
router.use("/todos", todos)

module.exports = router
