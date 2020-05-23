const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./users.json');
const subjects = require('./subjects.json');
const plans = require('./plans.json');

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

function getUserByUsername(username) {

    let result = users.find(u => {
        return u.username === username;
    })

    if (result !== undefined) {
        return result;
    }
    else {
        return null;
    }
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

    let result = users.find(u => {
        return username === u.username;
    });

    if (result !== undefined) {
        users[i].username = newUserInfo.username;
        users[i].firstName = newUserInfo.firstName;
        users[i].lastName = newUserInfo.lastName;
        users[i].email = newUserInfo.email;
        users[i].password = newUserInfo.password;

        fs.writeFile('users.json', JSON.stringify(users), () => {});
        return true;
    }
    else {
        return false;
    }
}

function deleteUser(username) {
    let userTmp = users.find(u => {
        return u.username === username;
    });
    
    if (userTmp != undefined) {
        let index = users.indexOf(userTmp);
        users.splice(index, 1);
        fs.writeFile('users.json', JSON.stringify(users), () => {});
    }
    else {
        return false;
    }

    
    let subjectTmp = subjects.find(s => {
        return s.username === username;
    });

    if (subjectTmp !== undefined) {
        let index = subjects.indexOf(subjectTmp);
        subjects.splice(index, 1);
        fs.writeFile('subjects.json', JSON.stringify(subjects), () => {});
    }
    
    

    let result = plans.find(u => {
        return u.username === username;
    });

    if (result != undefined) {
        let index = plans.indexOf(result);
        plans.splice(index, 1);
        fs.writeFile('plans.json', JSON.stringify(plans), () => {});
    }

    return true;
    
}

function getSubjectsForUser(username) {

    let subjectsUser = subjects.find(s => {
        return s.username === username;
    });

    if (subjectsUser !== undefined) {
        return subjectsUser.subjects;
    }
    else {
        return null;
    }

}

function addSubjectForUser(username, subject) {

    let subjectsUser = subjects.find(s => {
        return s.username === username;
    });

    if (subjectsUser === undefined) {
        return false;
    }

    let checkSubjectName = subjectsUser.subjects.find(s => {
        return s.subjectName === subject.username;
    });
    let checkTypeOfExam = subjectsUser.subjects.find(s => {
        return s.typeOfExam === subject.typeOfExam;
    });
    let checkMaterialType = subjectsUser.subjects.find(s => {
        return s.materialType === subject.materialType;
    });

    if ((checkSubjectName === undefined) || 
        (checkTypeOfExam === undefined) || 
        (checkMaterialType === undefined)) {
        let id = subjectsUser.subjects.length + 1;

        subjectsUser.subjects.push(
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
        fs.writeFile('subjects.json', JSON.stringify(subjects), () => {});
        return true;
    }
    else {
        return false;
    }
}

function changeProgress(username, idSubject, progressMade) {

    let userSubjects = subjects.find(s => {
        return s.username === username;
    });
    if (userSubjects === undefined) {
        return false;
    }
    else {
        let subjectToChange = userSubjects.subjects.find(s => {
            return s.id === idSubject;
        });
        if (subjectToChange === undefined) {
            return false;
        }
        else {
            subjectToChange.progress += progressMade;
            if (subjectToChange.progress >= subjectToChange.quantityOfMaterial) {
                deletePlan(username, subjectToChange.id);
            }
            
            return true;
        }
    }
}

function deleteSubject(username, id) {
    let userSubjects = subjects.find(s => {
        return s.username === username;
    });
    
    if (userSubjects !== undefined) {
        let subjectToDelete = userSubjects.subjects.find(s => {
            return s.id === Number(id);
        });
        

        if (subjectToDelete !== undefined) {
            let index = userSubjects.subjects.indexOf(subjectToDelete);
            userSubjects.subjects.splice(index, 1);

            for (let i = 0; i < subjects.length; i++) {
                if (username === subjects[i].username) {
                    subjects[i].subjects = userSubjects.subjects;
                    fs.writeFile('subjects.json', JSON.stringify(subjects), () => {});
                    return true;
                }
            }
        }
        else {
            return false;
        } 
    }
    else {
        return false;
    }

}

function deletePlan(username, id) {
    let userPlans = plans.find(p => {
        return p.username === username;
    });

    
    if (userPlans !== undefined) {
        let planToDelete = userPlans.plans.find(p => {
            return p.id === Number(id);
        });

        if (planToDelete !== undefined) {
            if (userPlans != undefined) {
                let index = userPlans.plans.indexOf(planToDelete);
                userPlans.plans.splice(index, 1);
                

                for (let i = 0; i < plans.length; i++) {
                    if (username === plans[i].username) {
                        plans[i].plans = userPlans.plans;
                        fs.writeFile('plans.json', JSON.stringify(plans), () => {});
                        return true;
                    }

                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
            

        
    }
    else {
        return false;
    }
    
}


function getSubject(username, id) {

    let userSubjects = subjects.find(s => {
        return s.username === username;
    });
    if (userSubjects === undefined) {
        return null;
    }
    else {
        let subjectToReturn = userSubjects.find(s => {
            return s.id === id;
        });
        return subjectToReturn === undefined ? null : subjectToReturn;
    }

}

function addPlan(username, plan) {

    let planUser = plans.find(p => {
        return p.username === username;
    });

    if (planUser === undefined) {
        plans.push({
            username: username,
            plans: [{
                date: (new Date()).toDateString(),
                id: plan.id,
                subjectName: plan.subjectName,
                materialForToday: plan.materialForToday,
                materialType: plan.materialType,
                typeOfExam: plan.typeOfExam
            }]
        });
        fs.writeFile('plans.json', JSON.stringify(plans), () => {});
        return true;
    }
    else {
        let checkDate = planUser.plans.find(p => {
            return p.date === plan.date;
        });
        let checkId = planUser.plans.find(p => {
            return p.id === plan.id;
        });
        let checkMaterialType = planUser.plans.find(p => {
            return p.materialType === plan.materialType;
        });
        let checkTypeOfExam = planUser.plans.find(p => {
            return p.typeOfExam === plan.typeOfExam;
        });

        if ((checkDate === undefined) || 
            (checkId === undefined) || 
            (checkMaterialType === undefined) ||
            (checkTypeOfExam === undefined)) {
            planUser.plans.push({
                date: (new Date()).toDateString(),
                id: plan.id,
                subjectName: plan.subjectName,
                materialForToday: plan.materialForToday,
                materialType: plan.materialType,
                typeOfExam: plan.typeOfExam
            });
            fs.writeFile('plans.json', JSON.stringify(plans), () => {});
            
            return true;
        }
        else {
            return false;
        }
    }

}


function getUserPlanForToday(username) {

    let planUser = plans.find(p => {
        return p.username === username;
    });

    if (planUser === undefined) {
        return null;
    }
    else {
        let retValue = [];
        for (let i = 0; i < planUser.plans.length; i++) {
            if (planUser.plans[i].date === (new Date()).toDateString()) {
                retValue.push(planUser.plans[i]);
            }
        }
        
        return retValue;
    }

}

function deleteUserPlansForToday(username) {
    let planUser = plans.find(p => {
        return p.username === username;
    });
    if (planUser === undefined) {
        return false;
    }

    let planForToday = planUser.plans.find(p => {
        return p.date === (new Date()).toDateString();
    });

    if (planForToday === undefined) {
        return false;
    }

    let index = plans.indexOf(planUser);
    plans.splice(index, 1);
    fs.writeFile('plans.json', JSON.stringify(plans), () => {});
    
    return true;

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
    response.send(registerUser(request.body));
});

app.route('/api/users/:username').put((request, response) => {
    response.send(changeUserInfo(request.params['username'], request.body));
});

app.route('/api/users/:username').delete((request, response) => {
    response.send(deleteUser(request.params['username']));
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

app.route('/api/subjects/:username').put((request, response) => {
    let id = Number(request.body.id);
    let progress = Number(request.body.progress);
    response.send(changeProgress(request.params['username'], id, progress));
});

app.route('/api/plans/:username').get((request, response) => {
    response.send(getUserPlanForToday(request.params['username']));
});


app.route('/api/plans/:username').post((request, response) => {
    response.send(addPlan(request.params['username'], request.body));
});

app.route('/api/plans/:username').delete((request, response) => {
    response.send(deleteUserPlansForToday(request.params['username']));
});

app.route('/api/subjects/:username/:id').delete((request, response) => {
    response.send(deleteSubject(request.params['username'], request.params['id']));
});

app.route('/api/plans/:username/:id').delete((request, response) => {
    response.send(deletePlan(request.params['username'], request.params['id']));
});

app.listen(3000, () => {
    console.log("server is active at: localhost:3000");
});