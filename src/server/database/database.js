const Datastore = require("nedb")
const { ENV } = process.env

const db = {
	users: new Datastore({ autoload:true, filename: './database/storage/users.db' }),
}
db.users.ensureIndex({ fieldName: 'email', unique:true }, (err) => {
	if (err)
		console.log('ensureIndex error',err)
})

const users = [
	{name: "Adam", email: "adam@g.com", birthday: Date.now(), phone: "31988776655"},
	{name: "Mike", email: "mike@g.com", birthday: Date.now(), phone: "31988776655"},
	{name: "Peter", email: "peter@g.com", birthday: Date.now(), phone: "31988776655"},
	{name: "Simon", email: "simon@g.com", birthday: Date.now(), phone: "31988776655"},
]

if (ENV === "development") { //clean the dev mess
	db.users.remove({}, {multi:true}, (err) => {
		if (err)
			return console.log(err)
		db.users.insert(users, (err) => {
			if (err) 
				console.log(err)
		});
	})
}

module.exports = db