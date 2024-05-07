'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VoucherUsed extends Model {

        static associate(models) {

        }
    };
    // 0 chua su dung
    // 1 da su dung
    VoucherUsed.init({
        voucherId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'VoucherUsed',
    });
    return VoucherUsed;
};