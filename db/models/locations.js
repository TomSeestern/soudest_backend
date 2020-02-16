module.exports = function (sequelize, DataTypes) {
    const locations = sequelize.define("locations", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        nameEng: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'To many Characters'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'To many Characters'
                }
            }
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Latitude to long!'
                }
            }
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Longitude to long!'
                }
            }
        },
        ril100: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 6],
                    msg: 'RIL100 Number to long!'
                }
            }
        },
        eva: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 10],
                    msg: 'EVA Number to long!'
                }
            }
        },

    }, {
        freezeTableName: true,
        tableName: 'locations',
        timestamps: true
    });

    return locations;
};