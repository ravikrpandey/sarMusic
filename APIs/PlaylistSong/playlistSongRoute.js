const songPlayListController = require("../PlaylistSong/playlistSongsController");

module.exports = app => {
    app.post("/api/createsongPlayList", songPlayListController.createsongPlayList );
    app.get("/api/getAllPlaylistData",songPlayListController.getSonPlayList);
    app.get("/api/getSongPlaylistById/:playlistSongId", songPlayListController.getSongPlaylistById );
    app.put("/api/updateSonPlaylist/:playlistSongId", songPlayListController.updateSonPlaylist);
    app.delete("/api/deleteSongPlayList/:playlistSongId", songPlayListController.deleteSongPlayList);
    app.put("/api/updateSongPlayedCount", songPlayListController.updateSongPlayedCount);
    app.get("/api/getUpdatedPlayedCount/:songId", songPlayListController.getUpdatedPlayedCount);
    app.get("/api/getAllUpdatedPlayedCount", songPlayListController.getAllUpdatedPlayedCount);


}