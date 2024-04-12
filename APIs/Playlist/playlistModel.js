module.exports = (sequelize, Sequelize) => {
    const playlist = sequelize.define("playlist", {
        playlistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        playlistName:{
            type:Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },

        description: {
            type: Sequelize.STRING
        },
        
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
    })
    return playlist;
}