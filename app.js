var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todolis");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./views'));

var idList = [];

var todoSchema = new mongoose.Schema({
    name: String
});

var Todo = mongoose.model("Todo", todoSchema);


app.get('/', function(request, response){
    Todo.find({}, function(error, todoList){
        if(error){
            console.log(error);
        }
        else{
            response.render('index', {todos: todoList} );
        }
    });



});


app.post('/todo', function(request, response){
    var newItem = new Todo({
        name: request.body.item
    });
    Todo.create(newItem, function(error, Todo){
        if(error){
            console.log(error);
        }
        else{
            console.log("Inserted item: "+ newItem );
        }
    });
    response.redirect("/");
    
});

app.delete('/del/:selectedTask', function(request, response){
    var deletedItem = new Todo({
        name:request.params.selectedTask
    });

    Todo.deleteOne(deletedItem, function(error, Todo){
        if(error){
            console.log(error);
        }
        else{
            console.log("Deleted item: " + deletedItem);
        }
    });

    response.redirect("/");
});


app.listen(27017);
console.log('You are listening to port 27017');


