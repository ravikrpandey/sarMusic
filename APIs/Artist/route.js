const artistController = require("../Artist/controller");


module.exports = app => {
    app.post('/api/createArtist', artistController.createArtist);
    app.get('/api/getArtistById/:id', artistController.getArtistById);
    app.get('/api/getAllArtists', artistController.getAllArtist);
}