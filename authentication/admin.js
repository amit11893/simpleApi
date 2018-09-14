const jwt = require('jsonwebtoken');
const admins = [
	{id: '1', username: 'admin1', password: 'admin1'},
	{id: '2', username: 'admin2', password: 'admin2'},
	{id: '3', username: 'admin3', password: 'admin3'},
];

module.exports = (req, res, next) => {
	if (!req.body.username || !req.body.password) {
		res
		.status(400)
		.send('you need a username and password');
		return;
		}
		const admin = admins.find(ad => {
			return ad.username === req.body.username && ad.password === req.body.password;
		});
		if(!admin) {
			res
			.status(401)
			.send("admin not found");
			return;
		}
	
		const token = jwt.sign({
			sub: admin.id,
			username: admin.username
        }, "adminsecretkey", {expiresIn: '3 hours'});
        res
		.status(200)
		.send({'access_key': token});
		next();
};