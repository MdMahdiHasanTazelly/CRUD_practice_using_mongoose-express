const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');

const Message = require("./models/chat");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//Databases connection
main()
.then( ()=> console.log("Database is connected"))
.catch( (err)=> console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//checking backend server connection
app.listen(8080, ()=>{
    console.log(`Listening on port 8080`);
});

app.get("/", (req, res)=>{
    res.send("this is root");
});

//shows all the chats
app.get("/chats", async(req, res)=>{
    let allMessages = await Message.find();

    res.render("index", {allMessages});
});

//adds a new chat
app.get("/chats/new", (req, res)=>{
    res.render("new");
});

app.post("/chats/new", (req, res)=>{
    let {from, to, msg} = req.body;
    Message.create({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    .then( ()=> console.log(`message inserted into databse`));

    res.redirect("/chats");
    
});

//updates a particular message base on id
app.get("/chats/:id", async(req, res)=>{
   let {id} = req.params;

   let message = await Message.findById(id);

   res.render("edit", {message});
});

app.patch("/chats/:id", async(req, res)=>{
    let{msg} = req.body;
    let {id} = req.params;

    let newMsg = await Message.findOneAndUpdate(
        {_id: id},
        {msg: msg},
        {checkRequired: true}
    );
    res.redirect("/chats");
});

//deletes a message
app.delete("/chats/:id", (req, res)=>{
    let {id} = req.params;

    Message.findByIdAndDelete(id)
    .then( ()=> console.log(`message deleted of ID: ${id}`));

    res.redirect("/chats");
});