const express = require("express");
const userRoutes= require("./routes/user.routes")
const errorMiddleware= require("./milddlewares/error.middleware")

const app = express();

app.use(express.json()); //body parser

app.use("/users", userRoutes);

//not found
app.use((req,res,next)=>{
    res.status(404).json({error:"route not found"});

});

app.use(errorMiddleware)


module.exports= app;