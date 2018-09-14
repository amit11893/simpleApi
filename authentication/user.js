const jwt = require('jsonwebtoken');
const users = [
	{id: '1', username: 'user1', password: 'user1'},
	{id: '2', username: 'user2', password: 'user2'},
	{id: '3', username: 'user3', password: 'user3'}
];

module.exports = (req, res, next) => {
	if (!req.body.username || !req.body.password) {
	res
	.status(400)
	.send('you need a username and password');
	return;
	}
	const user = users.find(u => {
		return u.username === req.body.username && u.password === req.body.password;
	});
	if(!user) {
		res
		.status(401)
		.send("User not found");
		return;
	}

	const token = jwt.sign({
		sub: user.id,
		username: user.username
	}, "usersecretkey", {expiresIn: '3 hours'});

	res
	.status(200)
    .send({'access_key': token});
    next();
};