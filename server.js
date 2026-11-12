var express = require("express");
var app = express();
var port = 8080;

app.use(express.json());
app.use(express.static(__dirname));

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
    }
];

var nextId = 3;

function findIndex(id){
    for(var i = 0; i < users.length; i++){
        if(users[i].id === id){
            return i;
        }
    }
    return -1;
}

app.get("/api/users", function(req, res){
    return res.json(users);
});

app.get("/api/users/randomuser", function(req, res){
    if(users.length === 0){
        res.status(404).json({"message" : "No users found"});
    }
    var randomIndex = Math.floor(Math.random() * users.length);
    return res.json(users[randomIndex]);
});

app.get("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        res.status(404).json({"message" : "User not found with id : " + id});
    }
    res.json(users[index]);
});

app.post("/api/users", function(req, res){
    if(!req.body.name || !req.body.gender){
        return res.status(400).json({"message" : "Name and Gender are mandatory "})
    }

    var newUser = {
        "id" : nextId++,
        "name" : req.body.name,
        "gender" : req.body.gender,
        "image" : req.body.image || "john.png"
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.patch("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        res.status(404).json({"message" : "user not found with id: " + id});
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
    res.json(users[index]);
});

app.delete("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index === -1){
        res.status(404).json("User not found with id : " + id);
    }
    var deletedUser = users[index];
    users.splice(index, 1);
    res.json({"message" : "User deleted successfully", "user" : deletedUser});
});

app.get("/api/users/randomuser", function(req, res){
    if(users.length === 0){
        res.status(404).json({"message" : "No users found"});
    }
    var randomIndex = Math.floor(Math.random() * user.length);
    return res.json(users[randomIndex]);
});


app.listen(port, function(){
    console.log("App is running on : http://localhost:" + port);
});

