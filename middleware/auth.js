const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    //Get the auth token from the header
    const token = req.header('x-auth-token')

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }) //401: not authorized
    }

    //Verify the token
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'))
        req.user = decoded.user
        next() //implementing the middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }

}