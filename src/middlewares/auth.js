const jwt = require('jsonwebtoken')

module.exports = {
    authentication: (req, res, next) => {
        const bearerHeader = req.headers.authorization
        let token;
        if(bearerHeader) {
            token = bearerHeader.split(' ')[1]
        }
    
        if(!token) {
            return res.sendStatus(403)
        }
    
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            }
    
            req.token = user
            next()
        })
    },
    authorization: (req, res, next) => {
        const token = req.token
        const { id } = req.params
        if(id) {
            const role = token.role
            console.log(token.id, id)
            if(token.id != id && role === 5) {
                return res.sendStatus(401)
            }
        } else {
            if(token.role === 5) {
                return res.sendStatus(401)
            }
        }

        next()
    }
}