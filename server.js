var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.static(__dirname));

// GET /api/users
// -> All the users

// GET /api/users/:id
// -> Return a user

// POST /api/users
// -> Add a new user in DB 

// PATCH /api/users/:id
// -> Update a user

// DELETE /api/users/:id
// -> Delete a user

// GET /api/users/randomUser
// -> Return random user from DB 

var users = [
    {
        "id" : 1,
        "name" : "John Doe",
        "gender" : "Male",
        "image" : "john.png"
    },
    {
        "id" : 2,
        "name" : "Jane Doe",
        "gender" : "Female",
        "image" : "jane.png"
    },
    {
        "id" : 3,
        "name" : "Aitor",
        "gender" : "Male",
        "image" : "https://randomuser.me/api/portraits/men/86.jpg"
    }
];

var curId = 4;

function findIndex(id){
    for(var i = 0; i < users.length; i++){
        if(id === users[i].id){
            return i;
        }
    }
    return -1;
};

app.get("/api/users", function(req, res){
    return res.json(users);
});

app.get("/api/users/randomuser", function(req, res){
    if(users.length === 0){
        return res.status(404).json({"message" : "No user found."});
    }
    var randomIndex = Math.floor(Math.random() * users.length);
    return res.json(users[randomIndex]);
});

app.get("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }
    return res.json(users[index]);
});

app.post("/api/users", function(req, res){
    if(!req.body.name || !req.body.gender){
        return res.status(400).json({"message" : "Bad Request : Name, Gender are mandatory fields to create a new user"});
    }

    var newUser = {
        "id" : curId++,
        "name" : req.body.name,
        "gender" : req.body.gender,
        "image" : req.body.image || "john.png"
    };

    users.push(newUser);

    return res.status(201).json({
        "message" : "New user is created",
        "newuser" : newUser
    });
});

app.patch("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }

    if(req.body.name){
        users[index].name = req.body.name;
    }
    if(req.body.gender){
        users[index].gender = req.body.gender;
    }
    if(req.body.image){
        users[index].image = req.body.image;
    }

    return res.json({"message" : "User updated with id : " + id, "updated user" : users[index]});
});

app.delete("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }

    var deletedUser = users[index];
    users.splice(index, 1);
    return res.json({"message" : "Deleted user with id : " + id, "Deleted user" : deletedUser});
});

// between 0 and 1 {0.001, 0.1275, 0.7654}



// users = 100 (index 0 to 99)
// case 1 if RI = 0.00 * 100 = 0
// case 2 if RI = 0.999999 * 100 = 99.9

app.listen(port, function(){
    console.log("App is running on : http://localhost:" + port);
});