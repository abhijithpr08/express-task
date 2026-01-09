const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.post('/form', (req, res) => {
    console.log(req.body)
    res.send('Form data received')
})

app.use((req, res, next) => {
    req.requestTime = Date.now()
    next()
})

// app.get("/",(req,res)=>{
//     // res.send("hello world")
//     res.send(`Request arrived at: ${req.requestTime}`)
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

const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

app.use((req,res,next)=>{
    console.log(req.method, req.url)
    next()
})

const auth = (req, res, next) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

app.get('/secure', auth, (req, res) => {
    res.send('Access Granted')
})

app.post('/add', (req, res) => {
    const { a, b } = req.body
    res.json({ result: a + b })
})

app.use((req, res, next) => {
    res.locals.user = 'Admin'
    next()
})

app.get('/local', (req, res) => {
    res.send(res.locals.user)
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})