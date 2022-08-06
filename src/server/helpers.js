const Err = (message, shouldReturn=false) => {
	return {message, shouldReturn};
}
const serializeUsers = (users) => {
	return users.map(user => serializeUser(user));
}
const serializeUser = (user) => {
	user.phone = user.phone.replace(/([0-9]{2})([0-9]{4,5}(?=[0-9]{4}))([0-9]{4})/, '($1) $2 $3')
	user.birthday = (new Date(user.birthday)).toLocaleString('pt-BR').split(' ')[0];
	return user;
}
const parseUser = (user) => {
	user.birthday = new Date(user.birthday);
	user.phone = user.phone.replace(/[^0-9]/gmi, '');
	user.email = user.email.trim().toLowerCase();
	if (user.phone.length < 10 || user.phone.length > 11)
		throw Err("Telefone inválido", true);
	return user;
}
const required = (values, fields=[]) => {
	let f = [];
	fields.map(fieldName => {
		if (fields.includes(fieldName) && !values[fieldName]) {
			f.push(fieldName);
		}
	})
	return f.length > 0
}

module.exports = {
	Err, serializeUser, serializeUsers, parseUser, required
}