const express = require("express");
const mongoose = require("mongoose")
const route = require("./routes/route") 

const configs = require("./configs")


const app  = express();

app.use(express.json())

mongoose.connect( configs.db.connection, {useNewUrlParser: true})
.then(()=>console.log("mongodb is connected"))
.catch((error)=> console.log(error))


app.use("/", route)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running on PORT${PORT}`))