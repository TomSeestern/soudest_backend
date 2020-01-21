const bcrypt = require("bcrypt");
module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'Zu viele Buchstaben!'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Zu viele Buchstaben!'
                }
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Es handelt sich nicht um eine E-Mail-Adresse.'
                }
                /* TODO: Implement Uniqueness
                isUnique: connection.validateIsUnique(
                    'email',
                    'Diese E-Mail-Adresse existiert bereits.'
                )*/
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'users',
        timestamps: true
    });

    // Method 3 via the direct method
    users.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
        })
            .catch(err => {
                throw new Error();
            });
    });

    return users;
};