const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  // pool: {
  //   max: config.pool.max,
  //   min: config.pool.min,
  //   acquire: config.pool.acquire,
  //   idle: config.pool.idle
  // }
});
const db = {};                                                                                                                
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// const { Sequelize } = require('sequelize');
const sequelize1 = new Sequelize('postgres://sarmusic_owner:AnqmH1fBt4as.com:ep-crimson-rice-a50d5owg.us-east-2.aws.neon.tech/sarmusic');


//=============== all model declaearations ===============
db.user = require("../APIs/Login/model.js")(sequelize, Sequelize);
db.album = require("../APIs/Album/albumModel.js")(sequelize, Sequelize);
db.artist = require("../APIs/Artist/model.js")(sequelize, Sequelize);
db.song = require("../APIs/Song/songModel.js")(sequelize, Sequelize);
db.playlist = require("../APIs/Playlist/playlistModel.js")(sequelize, Sequelize);
db.playlistSong = require("../APIs/PlaylistSong/playlistSongsModel.js")(sequelize, Sequelize);
db.userActivity =require("../APIs/UserActivity/userActivityModel.js")(sequelize,Sequelize)


// =============== artistToAlbumMapping ==============

// Define the association in the artist model
db.artist.hasMany(db.album, {
  foreignKey: 'artistId'
});

// Define the association in the album model
db.album.belongsTo(db.artist, {
  foreignKey: 'artistId'
});

//=========== playlist to user mapiing =========//

db.user.hasMany(db.playlist,{
  foreignKey: "userId"
})

db.playlist.belongsTo(db.user,{
  foreignKey: "userId"
})

//======== song playlist to user ====//

db.user.hasMany(db.playlistSong,{
  throgh: "playlistSong",
  foreignKey: "userId"
})

db.playlistSong.belongsTo(db.user,{
  throgh: "user",
  foreignKey: "userId"
})

//============ playlist to songplaylist =====//

db.playlist.hasMany(db.playlistSong,{
  throgh: "playlistSong",
  foreignKey: "playlistId"
})

db.playlistSong.belongsTo(db.playlist,{
  throgh: "playlist",
  foreignKey: "playlistId"
})

// ========= user Activity to user ===== //
 db.user.hasMany(db.userActivity,{
  throgh:"userActivity",
  foreignKey:"userId"
 })

 db.userActivity.belongsTo(db.user,{
  throgh:"user",
  foreignKey:"userId"
 })

 // ===== user Activity To song ===== //

 db.song.hasMany(db.userActivity,{
  throgh :"userActivity",
  foreignKey:"songId"
 })

 db.userActivity.belongsTo(db.song,{
  throgh :"song",
  foreignKey:"songId"
 })

//  ==== song to album ==== //

db.album.hasMany(db.song, {
  throgh:"song",
  foreignKey:"albumId"
})

db.song.belongsTo(db.album,{
  throgh:"album",
  foreignKey:"albumId"
})

// === song To artist === //

db.artist.hasMany(db.song, {
  throgh : "song",
  foreignKey:"artistId"
})

db.song.belongsTo(db.artist,{
  throgh :"artist",
  foreignKey:"artistId"
})






module.exports = db;