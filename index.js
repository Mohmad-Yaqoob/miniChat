const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require('method-override');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
    .then(()=>{console.log("connection successfull")})
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
})


app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});


app.post("/chats", (req, res) => {
    let {from, msg, to} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg, 
        to: to,
        created_at: new Date(),
    });
    newChat.save().then(res => {console.log("chat saved")})
            .catch((err)=>{console.log(err)});
    res.redirect("/chats");
})

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat =  await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//update
app.put("/chats/:id", async (req, res) =>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updateDate = new Date();
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        { msg: newMsg, created_at: updateDate},
        {runValidators:true, new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats")
})

//Destroy
app.delete("/chats/:id", async (req, res) => {
    let {id}= req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})
app.get("/", (req, res) =>{ 
    res.send("root is working");
})
app.listen(8080, () =>{
    console.log("server listining at 8080");
});