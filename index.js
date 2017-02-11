const express = require("express");
const Botly = require("botly");
const app = express();
const newPort = process.env.PORT || 8080
const botly = new Botly({
    accessToken: 'EAAPb6ZBvji1EBAG6ZCacYeD7AYM36ZCmT3LPH4dUKqSnrsBDfactqqPzTwFtldr4fZAiaR9GpXvFzaNFXp2tNcLRN37lvJQx3ePC3ffqZA5Qop2uNcH3yRc0HgVItZB3WRhUL7QIGp00nJoWFVDUqSO8y9qaDSWLgYvZAGUF3w7rAZDZD', //page access token provided by facebook 
    verifyToken: 'taller', //needed when using express - the verification token you provided when defining the webhook in facebook 
    webHookPath: '/webhook', //defaults to "/", 
    notificationType: Botly.CONST.REGULAR //already the default (optional), 
});

app.get('/', function(req, res) {
  res.send('hello world');
});

 
botly.on("message", (senderId, message, data) => {
    let text = `echo: ${data.text}`;
 
    botly.sendText({
      id: senderId,
      text: text
    });
});
 
// const app = express();
app.use("/webhook", botly.router());
var server = app.listen(newPort, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Web server started at http://%s:%s', host, port);
});
// app.listen(3000);