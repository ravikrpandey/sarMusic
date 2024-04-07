const albumController = require("../Album/albumController");


module.exports = app => {
    app.post('/api/createAlbum', albumController.createAlbum);
    app.get('/api/geAllAlbum', albumController.getAllAlbum);
    app.get('/api/getAlbumById/:albumId', albumController.getAlbumById);
    app.put('/api/updateAlbum/:albumId', albumController.updateAlbum);
    app.delete('/api/deleteAlbum/:albumId', albumController.deleteAlbum);
}