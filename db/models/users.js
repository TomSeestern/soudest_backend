const bcrypt = require("bcrypt-nodejs");
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
        console.log('Info: ' + 'Storing the Password');

        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, bcrypt.genSaltSync(10), null,
                function (err, hash) {
                    if (err) {
                        console.log('Error 8703: Error while Hashing Password:\n ' + err);
                        reject(err);
                    } else {
                        user.password = hash;
                        return resolve(user, options);
                    }
                }
            )
        });

    });

    // create some helper functions to work on the database
    users.createUser = async ({name, password}) => {
        return users.create({name, password});
    };
    users.getAllUsers = async () => {
        return users.findAll();
    };
    users.getUser = async obj => {
        return users.findOne({
            where: obj,
        });
    };
    users.deleteUser = async obj => {
        return users.destroy({
            where: obj,
        });
    };

    return users;
};