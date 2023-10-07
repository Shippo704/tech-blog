const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    // attributes
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            // minimum length requirement
            // post can't be empty
            validate: {
                len: [1]
            }
        },
        // FOREIGN KEY
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);

module.exports = Post;