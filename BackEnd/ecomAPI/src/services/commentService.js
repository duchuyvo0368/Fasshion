import db from "../models/index";
require('dotenv').config();

let createNewReview = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.content || !data.productId || !data.userId || !data.star) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.Comment.create({
                    content: data.content,
                    productId: data.productId,
                    userId: data.userId,
                    star: data.star,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllReviewByProductId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let res = await db.Comment.findAll({
                    where: {
                        productId: id
                    },
                    raw: true
                })

                if (res && res.length > 0) {

                    for (let i = 0; i < res.length; i++) {
                        res[i].image = res[i].image ? new Buffer(res[i].image, 'base64').toString('binary') : ''

                        res[i].childComment = await db.Comment.findAll({ where: { parentId: res[i].id } })
                        res[i].user = await db.User.findOne(
                            {
                                where: { id: res[i].userId },
                                attributes: {
                                    exclude: ['password']
                                },
                            })
                        res[i].user.image = new Buffer(res[i].user.image, 'base64').toString('binary')
                    }
                }

                resolve({
                    errCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let ReplyReview = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.content || !data.productId || !data.userId || !data.parentId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.Comment.create({
                    content: data.content,
                    productId: data.productId,
                    userId: data.userId,
                    parentId: data.parentId
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteReview = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let review = await db.Comment.findOne({
                    where: { id: data.id }
                })
                if (review) {
                    await db.Comment.destroy({
                        where: { id: data.id }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let createNewComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.content || !data.blogId || !data.userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.Comment.create({
                    content: data.content,
                    blogId: data.blogId,
                    userId: data.userId,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCommentByBlogId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let res = await db.Comment.findAll({
                    where: {
                        blogId: id
                    },
                    order: [['createdAt', 'DESC']],
                    raw: true
                })

                if (res && res.length > 0) {

                    for (let i = 0; i < res.length; i++) {
                        res[i].image = res[i].image ? new Buffer(res[i].image, 'base64').toString('binary') : ''

                        res[i].childComment = await db.Comment.findAll({ where: { parentId: res[i].id } })
                        res[i].user = await db.User.findOne(
                            {
                                where: { id: res[i].userId },
                                attributes: {
                                    exclude: ['password']
                                },
                            })
                        res[i].user.image = new Buffer(res[i].user.image, 'base64').toString('binary')
                    }
                }

                resolve({
                    errCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let ReplyComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.content || !data.blogId || !data.userId || !data.parentId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.Comment.create({
                    content: data.content,
                    blogId: data.blogId,
                    userId: data.userId,
                    parentId: data.parentId
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let comment = await db.Comment.findOne({
                    where: { id: data.id }
                })
                if (comment) {
                    await db.Comment.destroy({
                        where: { id: data.id }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewReview: createNewReview,
    getAllReviewByProductId: getAllReviewByProductId,
    ReplyReview: ReplyReview,
    deleteReview: deleteReview,
    createNewComment:createNewComment,
    getAllCommentByBlogId:getAllCommentByBlogId,
    deleteComment:deleteComment,
    ReplyComment:ReplyComment
}