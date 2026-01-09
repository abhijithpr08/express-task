const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

app.get("/greet/:name",(req,res)=>{
    res.send(`hello ${req.params.name}`)
})

app.get("/search", (req,res)=>{
    res.send(`Search for ${req.query.q}`)
})

app.get("/status",(req,res)=>{
res.json({status:"ok"})
})

app.use(express.static("public"))

app.get("/notfound", (req,res)=>{
    res.status(404).send("404 error: page not found")
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})