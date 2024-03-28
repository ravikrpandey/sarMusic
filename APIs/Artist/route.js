const artistController = require("../Artist/controller");


module.exports = app => {
    app.post('/api/createArtist', artistController.createArtist);
}