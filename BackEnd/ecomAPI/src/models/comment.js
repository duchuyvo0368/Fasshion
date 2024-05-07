'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Comment.init({
        content: DataTypes.TEXT('long'),
        parentId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        blogId: DataTypes.INTEGER,
        star: DataTypes.INTEGER,
        image: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};