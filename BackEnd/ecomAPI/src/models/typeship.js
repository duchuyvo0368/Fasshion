'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TypeShip extends Model {

        static associate(models) {
            TypeShip.hasMany(models.OrderProduct, { foreignKey: 'typeShipId', as: 'typeShipData' })
        }
    };
    TypeShip.init({
        type: DataTypes.STRING,
        price: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'TypeShip',
    });
    return TypeShip;
};