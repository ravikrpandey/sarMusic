module.exports = (sequelize, Sequelize) => {
    const userActivity = sequelize.define("userActivity", {
        userActivityId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        songId: {
            type: Sequelize.INTEGER
        },
        activityType: {
            type: Sequelize.ENUM("PLAY", "PAUSE", "SKIP")
        },
        // activityType: {
        //     type: Sequelize.STRING
        // },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
    })
    return userActivity;
};