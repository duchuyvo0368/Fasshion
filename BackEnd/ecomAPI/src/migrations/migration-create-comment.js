'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT('long')
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            parentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            blogId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            star: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Comments');
    }
};