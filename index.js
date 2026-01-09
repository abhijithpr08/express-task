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

app.post("/msg",(req,res)=>{
    res.send("message received")
})

app.get("/old",(req,res)=>{
    res.redirect("/new")
})

app.get("/new",(req,res)=>{
    res.send("hello new page")
})

app.get("/header",(req,res)=>{
    res.send(req.headers["user-agent"])
})

const step1 = (req,res,next)=>{
    console.log("step 1")
    next()
}

const step2 = (req,res)=>{
    console.log("step 2")
    res.send("multiple handler executed")
}

app.get("/steps",step1, step2)

app.post("/user", (req, res) => {
    console.log(req.body)

    res.send("Data received")
});

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})