const sarMusic = require("../Login/controller");

module.exports = app => {
    app.post("/api/loginUser", sarMusic.loginUser);
    app.get("/api/getLoginUser", sarMusic.getLoginUser);
}
