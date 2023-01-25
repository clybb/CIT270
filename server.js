const express = require("express");

const app = express();

const port = 3000;

const bodyParser = require ("body-parser");

const Redis = require("redis");

const redisClient = Redis.createClient({url:"redis://127.0.0.1:6379"});

const {v4: uuidv4} = require('uuid');

app.use(bodyParser.json()); // activates body-parser to look for incoming data


app.get("/", (req, res) => {
    res.send("Hello Caleb");
});

app.post('/login', (req, res) =>{
    const loginUser = req.body.userName;
    const loginPassword = req.body.password;
    console.log('Login username:'+loginUser);
    if (loginUser=="shady.construction@gmail.com" && loginPassword=="P@ssw0rd"){
        const loginToken = uuidv4();
        res.send(loginToken);
    }
    else {
        res.status(401);
        res.send("Inncorrect password for "+loginUser);
    }
})

app.listen(port, ()=> {
    redisClient.connect()
    console.log("listening");
});