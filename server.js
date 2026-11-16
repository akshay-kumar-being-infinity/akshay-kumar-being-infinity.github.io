var express = require("express");
var app = express();
var port = 8080;

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

app.get("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }
    return res.json(users[index]);
});




app.listen(port, function(){
    console.log("App is running on : http://localhost:" + port);
});


//hiiii