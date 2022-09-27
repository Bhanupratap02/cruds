const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());
app.get("/home", (req,res) =>{
    res.send("hello from nodejs api")
})

//routes middleware
app.use("/api/users",require("./routes/user"));
app.use("/api/send",require("./routes/sendEmail"));

//Catching 404 Error
app.use((req, res, next) => {
    const error = new Error("INVALID ROUTE");
    error.status = 404;
    next(error);
});

const PORT = 8000;
mongoose.connect("mongodb+srv://sachin:02112003@mycluster.vpmrumy.mongodb.net/crud-app?retryWrites=true&w=majority")
.then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
})
.catch((err)=>{
   console.log(err.message);
})