const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./users.json');

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

function getUserByUsername(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
    return null;
}

function registerUser(user) {
    if (getUserByUsername(user.username) === null) {
        users.push(user);
        fs.writeFile('users.json', users, () => {

        });
    }
}


app.route('/api/users').get((request, response) => {
    response.send(users);
});

app.route('/api/users/:username').get((request, response) => {
    const requestedUsername = request.params['username'];

    if (getUserByUsername(requestedUsername) === null) {
        response.send(null);
    }
    else {
        response.send(getUserByUsername(requestedUsername));
    }

    
});

app.route('/api/users/:username').post((request, response) => {
    registerUser(request.body);
    console.log(request.body);
    response.send(200, request.body);
});

app.listen(3000, () => {
    console.log("server is active at: localhost:3000");
});