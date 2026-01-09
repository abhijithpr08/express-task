import { Router } from "express"

const userRoutes = Router()

userRoutes.get("/", (req, res) => {
    res.send("User Route Working")
})

export default userRoutes
