import express from "express";
import userRoutes from "./routes/user.js"
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

const app = express();

const PORT = 3000

// 11 json body from post req
app.use(express.json())


// 15 form
app.use(express.urlencoded({ extended: true }))

app.post('/form', (req, res) => {
    console.log(req.body)
    res.send('Form data received')
})

// 18 add property to every req
app.use((req, res, next) => {
    req.requestTime = Date.now()
    next()
})

// app.get("/",(req,res)=>{
//     // res.send("hello world")
//     res.send(`Request arrived at: ${req.requestTime}`)
// })

// 23 save user to db
app.post('/users', async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json(user)
})

// 24 find user by id
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

// 25 update user 
app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(user)
})


// 2 greet a user
app.get("/greet/:name",(req,res)=>{
    res.send(`hello ${req.params.name}`)
})

// 3 search term from a query string
app.get("/search", (req,res)=>{
    res.send(`Search for ${req.query.q}`)
})

// 4 send an object containing app status
app.get("/status",(req,res)=>{
res.json({status:"ok"})
})

// 5 static hosting
app.use(express.static("public"))

// 6 404 error specific route
app.get("/notfound", (req,res)=>{
    res.status(404).send("404 error: page not found")
})

// 7 receive msg in postman
app.post("/msg",(req,res)=>{
    res.send("message received")
})


// 8 old new
app.get("/old",(req,res)=>{
    res.redirect("/new")
})

app.get("/new",(req,res)=>{
    res.send("hello new page")
})

// 9 header
app.get("/header",(req,res)=>{
    res.send(req.headers["user-agent"])
})

// 10 steps
const step1 = (req,res,next)=>{
    console.log("step 1")
    next()
}

const step2 = (req,res)=>{
    console.log("step 2")
    res.send("multiple handler executed")
}

app.get("/steps",step1, step2)

// 16 user route
app.post("/user", (req, res) => {
    console.log(req.body)

    res.send("Data received")
});

app.use('/user', userRoutes)

// 12 logger
app.use((req,res,next)=>{
    console.log(req.method, req.url)
    next()
})

// 13 simple auth
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

// 14 calculator
app.post('/add', (req, res) => {
    const { a, b } = req.body
    res.json({ result: a + b })
})

// 17 admin
app.use((req, res, next) => {
    res.locals.user = 'Admin'
    next()
})

app.get('/local', (req, res) => {
    res.send(res.locals.user)
})

// 19 basic error handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message })
})

// 20 array
const books = [
    { id: 1, title: 'Node JS' },
    { id: 2, title: 'Express JS' }
]

app.get('/books', (req, res) => {
    res.json(books)
})

// 1 create server on port 3000
// 21 db connection
connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})
});