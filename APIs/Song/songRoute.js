const songRoute = require("../Song/songController");

module.exports = app => {
app.post("/api/createSong", songRoute.createSong);
app.get("/api/getAllSong", songRoute.getAllSong);
}