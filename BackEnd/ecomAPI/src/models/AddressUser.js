'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AddressUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    AddressUser.init({
        userId: DataTypes.INTEGER,
        shipName: DataTypes.STRING,
        shipAdress: DataTypes.STRING,
        shipEmail: DataTypes.STRING,
        shipPhonenumber: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AddressUser',
    });
    return AddressUser;
};