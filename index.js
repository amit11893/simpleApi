const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8000;


const admins = [
	{id: '1', username: 'admin1', password: 'admin1'},
	{id: '2', username: 'admin2', password: 'admin2'},
	{id: '3', username: 'admin3', password: 'admin3'},
]
const users = [
	{id: '1', username: 'user1', password: 'user1'},
	{id: '2', username: 'user2', password: 'user2'},
	{id: '3', username: 'user3', password: 'user3'}
];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('combined'));
app.use(cors());


app.post("/admin/*", (req, res) => {
	if (!req.body.username || !req.body.password) {
		res
		.status(400)
		.send('you need a username and password');
		return;
		}
		const admin = admins.find(ad => {
			return ad.username === req.body.username && ad.password === req.body.password
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
}); 

app.get('/admin/*', expressjwt({
	secret: "adminsecretkey"
}),(req, res) => {
	res
	.status(200)
	.send('hi admin')
});

app.post('/user/*', (req, res) => {
	if (!req.body.username || !req.body.password) {
	res
	.status(400)
	.send('you need a username and password');
	return;
	}
	const user = users.find(u => {
		return u.username === req.body.username && u.password === req.body.password
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
});

app.get('/user/*', expressjwt({
	secret: "usersecretkey"
}) ,(req, res) => {
    res.end(`hi user`)
})

app.get('/open/*', (req, res) => {
	res
	.status(200)
	.send(`Hello World`);
});

app.get('*', (req, res) => {
	res.sendStatus(404);
});

app.listen(PORT);

