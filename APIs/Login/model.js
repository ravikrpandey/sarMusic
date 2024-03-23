module.exports = (sequelize , Sequelize) => {
    const tbl_loginUser = sequelize.define('tbl_loginUser', {
        login_id : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
             primaryKey: true
          },
          mobile_number: {
            type: Sequelize.STRING,
            unique: true
          },
          otp: {
            type: Sequelize.STRING
          }
    });
    return tbl_loginUser
}