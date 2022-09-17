require("dotenv").config({path: "src/server/.env"});
const fs = require("fs")
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/database")
const domain = require("node:domain")
const { required, serializeUsers, serializeUser, parseUser, Err } = require("./helpers.js")

const { PORT=3000, ENV } = process.env;

const api = express();

api.use(express.static('dist'));
api.use((req, res, next) => {
	let d = domain.create();
	d.on('error', (err) => {
			if (err) {
				console.log('handler',err);
				if (err.shouldReturn)
					return res.json({error: err.message});
				res.json({error: "Erro no servidor"});
			} else {
				next();
			}
	})
	d.run(() => next())
})
api.use((req, res, next) => {
	if (ENV === 'development') {
		res.setHeader("Cache-Control", "no-cache");
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', "*");
	next();
})

api.use(bodyParser.json());

api.get('/port', (req, res) => res.send(PORT));

api.get("/users", (req, res) => {
	db.users.find({}, (err, users) => {
		if (err) {
			console.error(err);
			res.json({error: "Falha ao buscar usuários, tente novamente."})
		} else {
			res.json(serializeUsers(users))
		}
	})
})

api.post("/user", (req, res) => {
	const user = req.body;
	let result = required(user, ['name','birthday','email','phone']);
	if (result) return res.json({error: "Todos os campos são obrigatórios"})
	db.users.find({email: user.email}, (err, data) => {
		if (data.length > 0) {
			res.json({error: "E-mail já cadastrado"})
		} else {
			db.users.insert(parseUser(user), (err) => {
				if (err) {
					console.error('user.insert',err)
					res.json({ error: "Falha, tente novamente." })
				} else {
					res.json({ message: "OK" })
				}
			});
		}
	})
})

api.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})