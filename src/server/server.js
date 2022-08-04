require("dotenv").config({path: "src/server/.env"});
const fs = require("fs")
const express = require("express");


const {PORT} = process.env;
const api = express();


const users = [
	{name: "Adam", email: "adam@g.com", birthday: Date.now(), phone: "(31)000000000"},
	{name: "Mike", email: "mike@g.com", birthday: Date.now(), phone: "(31)000000000"},
	{name: "Peter", email: "peter@g.com", birthday: Date.now(), phone: "(31)000000000"},
	{name: "Simon", email: "simon@g.com", birthday: Date.now(), phone: "(31)000000000"},
]
api.use((req, res, next) => {
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader('Access-Control-Allow-Origin', '*')
	next();
})
api.get("/users", (req,res) => {
	setTimeout(() => res.json(users), 2000)
})

api.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})