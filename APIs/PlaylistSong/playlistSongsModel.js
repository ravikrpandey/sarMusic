module.exports = (sequelize, Sequelize) => {
    const playlistSong = sequelize.define("playlistSong", {
        playlistSongId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        playlistId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        }

    })
    return playlistSong;
}