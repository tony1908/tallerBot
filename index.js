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

var training_data = [
  {"ojos":"azul","nacionalidad":"mexicana","nombre":"Ana"},
  {"ojos":"cafe","nacionalidad":"argentina","nombre":"Fernanda"}, 
  {"ojos":"verde","nacionalidad":"chilena","nombre":"Diana"},
];


var features = ["ojos","nacionalidad"];
var class_name = "nombre";

var dt = new DecisionTree(training_data, class_name, features);

app.get('/', function(req, res) {
  res.send('Hola');
});

 
botly.on("message", (senderId, message, data) => {
	console.log(message)
	console.log(data)
	console.log("estoy dentro")
    let text = `echo: ${data.text}`;
    // text = 'echo' + data.text;
 
 //    botly.sendText({id: senderId, text: "Hi There!"}, function (err, data) {
 //    	console.log(data)
	// });


	let buttons = [];
	
	buttons.push(botly.createPostbackButton("Azules", "azul"));
	buttons.push(botly.createPostbackButton("Cafe", "cafe"));
	buttons.push(botly.createPostbackButton("Verdes", "verde"));
	botly.sendButtons({id: senderId, text: "De que color son tus ojos?", buttons: buttons}, function (err, data) {
	       console.log(data)

	});


});

botly.on("postback", (senderId, message, postback, ref) => {
	console.log(senderId)
	console.log("postback")
	console.log(postback)

	switch (postback) {
   
    case "azul":
    	botly.sendText({id: senderId, text: "Tus ojos son como el mar"}, function (err, data) {
	    	console.log(data)
		});

        break;
    case "cafe":
    botly.sendText({id: senderId, text: "Son como un dona de chocolate"}, function (err, data) {
	    	console.log(data)
		});

}


});
 
app.use("/webhook", botly.router());
var server = app.listen(newPort, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Web server started at http://%s:%s', host, port);
});