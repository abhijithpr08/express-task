const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.get("/greet/:name",(req,res)=>{
    res.send(`hello ${req.params.name}`)
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})