module.exports = (sequelize, Sequelize) => {
    const playlistSong = sequelize.define("playlistSong", {
        playlistSongId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        songPlaylistName: {
            type: Sequelize.STRING
        },
        playlistId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
    })
    return playlistSong;
}