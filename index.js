const http = require('http');
var express = require('express');
var app = express();

const hostname = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

function generateTwKey(){
    const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = "AC45097aa30c4f7eb70038d7c716c11c94";
const twilioApiKey = "SK3689406041f696415c8cf04076bec818";
const twilioApiSecret = "QsJDptxZHbLXJ2PTzttvxes2VackguVC";

// Used specifically for creating Chat tokens
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const identity = 'user@example.com';

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);
return token.toJwt();
}



//CALL ALL USERS
app.get("/generatekey", async (req, res) => {
    // Generate Token Here
    return res.json(generateTwKey());
});
app.listen(PORT, async function  () {
    console.log('Service URL http://127.0.0.1:' + PORT + "/");
});