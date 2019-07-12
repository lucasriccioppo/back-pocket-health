const jwt = require('jsonwebtoken')
require('dotenv/config')

const checkToken = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

module.exports = checkToken