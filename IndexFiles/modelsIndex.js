const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


//=============== all model declaearations ===============
db.user = require("../APIs/Login/model.js")(sequelize, Sequelize);
db.album = require("../APIs/Album/albumModel.js")(sequelize, Sequelize);
db.artist = require("../APIs/Artist/model.js")(sequelize, Sequelize);
db.song = require("../APIs/Song/songModel.js")(sequelize, Sequelize);
db.playlist = require("../APIs/Playlist/playlistModel.js")(sequelize, Sequelize);
db.playlistSong = require("../APIs/PlaylistSong/playlistSongsModel.js")(sequelize, Sequelize);



// =============== artistToAlbumMapping ==============

// Define the association in the artist model
db.artist.hasMany(db.album, {
  foreignKey: 'artistId'
});

// Define the association in the album model
db.album.belongsTo(db.artist, {
  foreignKey: 'artistId'
});









module.exports = db;