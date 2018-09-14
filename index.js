const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('combined'));
app.use(cors());


app.post("/admin/*", require('./authentication/admin')); 

app.get('/admin/*', expressjwt({
	secret: "adminsecretkey"
}),(req, res) => {
	res
	.status(200)
	.send('hi admin')
});

app.post('/user/*', require('./authentication/user'));

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

