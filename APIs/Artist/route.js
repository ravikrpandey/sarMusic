const artistController = require("../Artist/controller");


module.exports = app => {
    app.post('/api/createArtist', artistController.createArtist);
    app.get('/api/geAllArtist', artistController.geAllArtist);
    app.get('/api/getArtistById/:artistId', artistController.getArtistById);
    app.put('/api/updateArtist/:artistId', artistController.updateArtist);
    app.delete('/api/deleteArtist/:artistId', artistController.deleteArtist);
}