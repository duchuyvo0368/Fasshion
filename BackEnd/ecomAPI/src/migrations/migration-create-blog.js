'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            shortdescription: {
                type: Sequelize.TEXT('long')
            },
            title: {
                type: Sequelize.STRING
            },
            subjectId: {
                type: Sequelize.STRING
            },
            statusId: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            userId: {
                type: Sequelize.INTEGER
            },
            view: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Blogs');
    }
};