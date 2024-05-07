'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
          

        }
    };
    Message.init({
        text: DataTypes.TEXT('long'),
        userId: DataTypes.INTEGER,
        roomId: DataTypes.INTEGER,
        unRead:DataTypes.BOOLEAN,
       
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};