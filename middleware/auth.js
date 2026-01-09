import jwt from 'jsonwebtoken'

const JWT_SECRET = 'mysecretkey'

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).send('No Token')

    try {
        jwt.verify(token, JWT_SECRET)
        next()
    } catch {
        res.status(401).send('Invalid Token')
    }
}

export default auth
