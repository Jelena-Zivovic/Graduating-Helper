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
        fs.writeFile('users.json', JSON.stringify(users), () => {
            
        });
        return true;
    }
    else {
        return false;
    }
}

function changeUserInfo(username, newUserInfo) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            users[i].username = newUserInfo.username;
            users[i].firstName = newUserInfo.firstName;
            users[i].lastName = newUserInfo.lastName;
            users[i].email = newUserInfo.email;
            users[i].password = newUserInfo.password;

            fs.writeFile('users.json', JSON.stringify(users), () => {

            });
            return;
        }
    }
}

function deleteUser(username) {
    let usersTmp = [];
    for (let i = 0; i < users.length; i++) {
        if (username === users[i].username) {
            continue;
        }
        else {
            usersTmp.push(users[i]);
        }
    }

    fs.writeFile('users.json', JSON.stringify(usersTmp), () => {

    });
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

app.route('/api/users').post((request, response) => {
    if (registerUser(request.body)) {
        response.status(200).send(request.body);
    }
    else {
        response.status(404).send("user is already registered");
    }
});

app.route('/api/users/:username').put((request, response) => {
    changeUserInfo(request.params['username'], request.body);
    response.status(200);
});

app.route('/api/users/:username').delete((request, response) => {
    deleteUser(request.params['username']);
    response.status(200);
});

app.listen(3000, () => {
    console.log("server is active at: localhost:3000");
});