var sequelize = require('sequelize');

var sequelizeInstance = new sequelize('userdb', 'sd_admin', 'sd_admin,,sd_admin', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// Initialize models
var users = sequelizeInstance.import('./models/users');
var edges = sequelizeInstance.import('./models/edges');

// Relations 1:n
// Player bekommt eine teamId
// Team.hasMany(Player, {foreignKey: 'teamId'});
// Player.belongsTo(Team);
// oder vom Player ausgehend
// Player.belongsTo(Team, {foreignKey: 'teamId'});

// n:m
//Player.belongsToMany(Team, { through: 'PlayerTeam'});
//Team.belongsToMany(Player, { through: 'PlayerTeam'});


// Create tables with models
sequelizeInstance.sync().then(function () {
}).catch(function (err) {
    console.log(err);
});

module.exports = {
    sequelizeInstance: sequelizeInstance,
    sequelize: sequelize
};