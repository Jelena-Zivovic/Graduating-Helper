const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./users.json');
const subjects = require('./subjects.json');

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
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
        subjects.push({
            username: user.username,
            subjects: []
        });
        fs.writeFile('subjects.json', JSON.stringify(subjects), () => {

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

    let subjectsTmp = [];
    for (let i = 0; i < subjects.length; i++) {
        if (username === subjects[i].username) {
            continue;
        }
        else {
            subjectsTmp.push(subjects[i]);
        }
    }

    fs.writeFile('subjects.json', JSON.stringify(subjectsTmp), () => {

    });
}

function getSubjectsForUser(username) {
    for (let i = 0; i < subjects.length; i++) {
        if (username === subjects[i].username) {
            return subjects[i].subjects;
        }
    }
    return null;
}

function addSubjectForUser(username, subject) {
    for (let i = 0; i < subjects.length; i++) {
        if (username === subjects[i].username) {
            for (let j = 0; j < subjects[i].subjects; j++) {
                if ((subject.subjectName === subjects[i].subjects[j].subjectName) && 
                    (subject.typeOfExam === subjects[i].subjects[j].typeOfExam) && 
                    (subject.materialType === subjects[i].subjects[j].materialType)) {
                    return null;
                }
            }
            let id = subjects[i].subjects.length + 1;

            subjects[i].subjects.push(
                {
                    id: id,
                    subjectName: subject.subjectName,
                    examDate: subject.examDate,
                    typeOfExam: subject.typeOfExam,
                    complexityLevel: subject.complexityLevel,
                    materialType: subject.materialType,
                    quantityOfMaterial: subject.quantityOfMaterial,
                    progress: 0
                }
            );
            fs.writeFile('subjects.json', JSON.stringify(subjects), () => {

            });
            return true;

        }
    }
}

function changeProgress(username, idSubject, progressMade) {
    for (let i = 0; i < subjects.length; i++) {
        if (username === subjects[i].username) {
            for (let j = 0; j < subjects[i].subjects.length; j++) {
                if (idSubject === subjects[i].subjects[j]) {
                    subjects[i].subjects[j].progress += progressMade;
                    return;
                }
            }
        }
    }
}

function getSubject(username, id) {
    for (let i = 0; i < subjects.length; i++) {
        if (username === subjects[i].username) {
            for (let j = 0; j < subjects[i].subjects.length; j++) {
                if (id === subjects[i].subjects[j]) {
                    return subjects[i].subjects[j];
                }
            }
        }
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

app.route('/api/subjects/:username').get((request, response) => {
    response.send(getSubjectsForUser(request.params['username']));
});

app.route('/api/subjects/:username/:id').get((request, response) => {
    response.send(getSubject(request.params['username'], Number(request.params['id'])));
})

app.route('/api/subjects/:username').post((request, response) => {
    response.send(addSubjectForUser(request.params['username'], request.body));
});

app.route('/api/subjects/:username/:id').put((request, response) => {
    let id = Number(request.params['id']);
    let progress = request.body.progress;
    changeProgress(request.params['username'], id, progress);
    response.status(200);
});

app.listen(3000, () => {
    console.log("server is active at: localhost:3000");
});