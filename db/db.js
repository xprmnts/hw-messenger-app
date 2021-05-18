const Sequelize = require('sequelize');

const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost:5432/messenger',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false
        }
    }
);

module.exports = db;
