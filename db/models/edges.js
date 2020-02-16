module.exports = function (sequelize, DataTypes) {
    const edges = sequelize.define("edges", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        transportType: {
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
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'To many Characters'
                }
            }
        },
        totalTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Total time to long!'
                }
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Price to high'
                }
            }
        },
        startTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'StartTime to high'
                }
            }
        },
        endTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'StartTime to high'
                }
            }
        },
        startLocId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'StartTime to high'
                }
            }
        },
        endLocId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'StartTime to high'
                }
            }
        },
        path: {
            type: DataTypes.JSON,
            allowNull: false,
        },

    }, {
        freezeTableName: true,
        tableName: 'edges',
        timestamps: true
    });

    return edges;
};