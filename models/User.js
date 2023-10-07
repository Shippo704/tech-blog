const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    // password checks against the hashed version
    // security purposes
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
};

User.init (
    // attributes
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // needs to be an email
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // minimum length requirement
            validate: {
                len: [5]
            }
        }
    },
    {
        hooks: {
            // hash the password for security
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            // update then hash password for security
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;