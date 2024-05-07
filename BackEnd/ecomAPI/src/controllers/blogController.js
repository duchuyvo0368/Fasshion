import blogService from '../services/blogService';

let createNewBlog = async (req, res) => {
    try {
        let data = await blogService.createNewBlog(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getDetailBlogById = async (req, res) => {
    try {
        let data = await blogService.getDetailBlogById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllBlog = async (req, res) => {
    try {
        let data = await blogService.getAllBlog(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let updateBlog = async (req, res) => {
    try {
        let data = await blogService.updateBlog(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let deleteBlog = async (req, res) => {
    try {
        let data = await blogService.deleteBlog(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getFeatureBlog = async (req, res) => {
    try {
        let data = await blogService.getFeatureBlog(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getNewBlog = async (req, res) => {
    try {
        let data = await blogService.getNewBlog(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    createNewBlog: createNewBlog,
    getDetailBlogById: getDetailBlogById,
    getAllBlog: getAllBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    getFeatureBlog:getFeatureBlog,
    getNewBlog:getNewBlog
}