const jwt = require('jsonwebtoken')
import db from "../models/index";
require('dotenv').config();
const secretString = process.env.JWT_SECRET

const middlewareControllers = {
    verifyTokenUser: (req, res, next) => {
        const token = req.headers.authorization

        if (token) {
            const accessToken = token.split(' ')[1]

            jwt.verify(accessToken, secretString, async (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        errMessage: 'Token is not valid!',
                        refresh: true,
                    })
                }
                const user = await db.User.findOne({ where: { id: payload.sub } })
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        errMessage: 'User is not exits',
                        refresh: true,
                    })
                }

                req.user = user
                console.log(token)
                next()
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "You're not authentication!",
                refresh: true,
            })
        }
    },
    verifyTokenAdmin: (req, res, next) => {
        const token = req.headers.authorization

        if (token) {
            const accessToken = token.split(' ')[1]

            jwt.verify(accessToken, secretString, async (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        errMessage: 'Token is not valid!',
                        refresh: true,
                    })
                }
                const user = await db.User.findOne({ where: { id: payload.sub } })
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        errMessage: 'User is not exits',
                        refresh: true,
                    })
                }
                if (user && (user.roleId == 'R4' || user.roleId == 'R1')) {
                    req.user = user
                    next()

                } else {
                    return res.status(404).json({
                        status: false,
                        errMessage: 'Bạn không có đủ quyền',
                        refresh: true,
                    })
                }

            })
        } else {
            return res.status(401).json({
                status: false,
                errMessage: "You're not authentication!",
                refresh: true,
            })
        }
    },
}

module.exports = middlewareControllers