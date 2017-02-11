const express = require("express");
const Botly = require("botly");
const bodyParser = require('body-parser')
const app = express();
const DecisionTree = require('decision-tree');
const newPort = process.env.PORT || 8080
app.use(bodyParser.json())
const botly = new Botly({
    accessToken: 'EAAPb6ZBvji1EBAG6ZCacYeD7AYM36ZCmT3LPH4dUKqSnrsBDfactqqPzTwFtldr4fZAiaR9GpXvFzaNFXp2tNcLRN37lvJQx3ePC3ffqZA5Qop2uNcH3yRc0HgVItZB3WRhUL7QIGp00nJoWFVDUqSO8y9qaDSWLgYvZAGUF3w7rAZDZD', //page access token provided by facebook 
    verifyToken: 'taller', //needed when using express - the verification token you provided when defining the webhook in facebook 
    webHookPath: '/webhook', //defaults to "/", 
    notificationType: Botly.CONST.REGULAR //already the default (optional), 
});

app.get('/', function(req, res) {
  res.send('Hola');
});

 
botly.on("message", (senderId, message, data) => {
	console.log(message)
	console.log(data)
	console.log("estoy dentro")
    let text = `echo: ${data.text}`;
 
 //    botly.sendText({id: senderId, text: "Hi There!"}, function (err, data) {
 //    	console.log(data)
	// });


	let buttons = [];
	buttons.push(botly.createWebURLButton("Go to Askrround", "http://askrround.com"));
	buttons.push(botly.createPostbackButton("Continue", "continue"));
	botly.sendButtons({id: userId, text: "What do you want to do next?", buttons: buttons}, function (err, data) {
	       console.log(data)

	});


});
 
app.use("/webhook", botly.router());
var server = app.listen(newPort, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Web server started at http://%s:%s', host, port);
});