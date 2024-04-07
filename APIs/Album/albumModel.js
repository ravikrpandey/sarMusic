    module.exports = (sequelize, Sequelize) => {
        const album = sequelize.define('album', {
        albumId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        albumName: {
            type: Sequelize.STRING
        },
        artistId: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        releaseDate: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        albumCardUrl: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        });
        return album;
    }