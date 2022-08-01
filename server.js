const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('unable to append to server.log')
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})


// app.get('/',(req,res)=>{
// 	res.send('<h1> Hello Express!</h1>');
// 	res.send({
// 		name: 'Patrick',
// 		likes: [
// 			'singing',
// 			'basketball',
// 			'Movies'
// 		]
// 	});
// });

app.get('/',(req,res) => {
	res.render('home.hbs', {
		helloMsg: 'Welcome helper best platform for ABC',
		contactUs: 'call us if you need help'
	});
});

app.get('/bad', (req,res) =>{
	// res.send('this is an error message');
	res.send({
		errorMessage: 'sorry this is an error try something else!'
	})
})

app.get('/about',(req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About Title',
		ptag: 'some text here  '
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
});


app.listen(port, () => {
	console.log(`server is up on port ${port}`)
});
