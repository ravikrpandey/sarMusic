const songRoute = require("../Song/songController");

module.exports = app => {
app.post("/api/createSong", songRoute.createSong);
app.get("/api/getAllSong", songRoute.getAllSong);
app.get("/api/getSongById/:id", songRoute.getSongById);
app.get("/api/getSongsByAlbumId/:albumId", songRoute.getSongsByAlbumId);
app.put("/api/updateSong/:id", songRoute.updateSong);
app.delete("/api/deleteSong/:id", songRoute.deleteSong);
app.get("/api/getSongUrlByYoutubeLink", songRoute.getSongUrlByYoutubeLink);
}