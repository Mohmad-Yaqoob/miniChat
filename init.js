const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
    .then(()=>{console.log("connection successfull")})
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allchats = [
    {
        from: "Ali",
        to: "Zara",
        msg: "Hey Zara, did you complete the project?",
        created_at: new Date(),
    },
    {
        from: "Zara",
        to: "Ali",
        msg: "Yes, almost done. Just finishing the final touches.",
        created_at: new Date(),
    },
    {
        from: "Rehan",
        to: "Sara",
        msg: "Sara, can you send me the meeting notes?",
        created_at: new Date(),
    },
    {
        from: "Sara",
        to: "Rehan",
        msg: "Sure, I’ll email them to you in a few minutes.",
        created_at: new Date(),
    },
    {
        from: "Amir",
        to: "Maya",
        msg: "Are we still on for dinner tonight?",
        created_at: new Date(),
    },
    {
        from: "Maya",
        to: "Amir",
        msg: "Yes, I’m looking forward to it!",
        created_at: new Date(),
    },
    {
        from: "Kabir",
        to: "Anaya",
        msg: "Do you have the latest code from the repository?",
        created_at: new Date(),
    },
    {
        from: "Anaya",
        to: "Kabir",
        msg: "Yes, I just pulled it. I can share it with you.",
        created_at: new Date(),
    },
    {
        from: "Farah",
        to: "Omar",
        msg: "Let’s catch up later in the evening.",
        created_at: new Date(),
    },
    {
        from: "Omar",
        to: "Farah",
        msg: "Sounds good! See you at 6.",
        created_at: new Date(),
    }
];

Chat.insertMany(allchats)