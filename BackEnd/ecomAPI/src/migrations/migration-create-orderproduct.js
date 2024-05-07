'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orderproducts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            addressUserId: {
                type: Sequelize.INTEGER
            },
            shipperId: {
                type: Sequelize.INTEGER
            },
            statusId: {
                type: Sequelize.STRING
            },
            typeShipId: {
                type: Sequelize.INTEGER
            },
            voucherId: {
                type: Sequelize.INTEGER
            },
            note: {
                type: Sequelize.STRING
            },
            isPaymentOnlien: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            image: {
                type: Sequelize.BLOB('long')
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Orderproducts');
    }
};