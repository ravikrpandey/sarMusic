module.exports = (sequelize, Sequelize) => {
    const playlist = sequelize.define("playlist", {
        playlistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER
        }

    })
    return playlist;
}