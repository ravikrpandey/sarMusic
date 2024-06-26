module.exports = (sequelize, Sequelize) => {
    const playlistSong = sequelize.define("playlistSong", {
        playlistSongId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        playlistName: {
            type: Sequelize.STRING
        },
        playlistId: {
            type: Sequelize.INTEGER
        },
        songId: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
    })
    return playlistSong;
}