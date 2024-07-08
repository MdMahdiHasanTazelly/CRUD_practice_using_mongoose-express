//for initialization of the database with some sample documents
const mongoose = require('mongoose');
const Message = require("./models/chat");

main()
.then( ()=> console.log("Database is connected"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
    {
        from: "Rajib",
        to: "jamal",
        msg: "how was the previous class?",
        created_at: new Date()
    },
    {
        from: "Jakir",
        to: "tanvir",
        msg: "Lets go on a vacation!",
        created_at: new Date()
    },
    {
        from: "safayet",
        to: "rokib",
        msg: "let's do some mern projects",
        created_at: new Date()
    }
];

Message.insertMany(allChats)
.then( (res)=>console.log(res));