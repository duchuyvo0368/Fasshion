import JWT from 'jsonwebtoken'
require('dotenv').config();

let encodeToken = (userId) =>{
    return JWT.sign({
        iss: 'Bi Ngo',
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +3)
    },process.env.JWT_SECRET)
}
module.exports = {
    encodeToken:encodeToken
}