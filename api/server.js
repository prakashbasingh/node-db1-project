const express = require("express");
const AccountsRouter = require("../routers/accounts-router.js")

const AccountDb = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountsRouter)

server.get("/", (req, res) => {
    res.status(200).json({message: "This is second week, day 1 back end project about DATABASE (db)"})
})

module.exports = server;
