module.exports = (sequelize, Sequelize) => {
    const artist = sequelize.define('artist', {
      artistId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      artistName: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      }
    });
    return artist;
  }