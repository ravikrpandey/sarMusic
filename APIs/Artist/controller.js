const db = require("../../IndexFiles/modelsIndex");
const tbl_artist = db.artist;

exports.createArtist = async (req, res) => {
    try {
        const { artistName, bio, country } = req.body;

        const data = await tbl_artist.create({artistName, bio, country});
        return res.status(200).send({code: 200, message: 'Artist Created Successfully', data: data});

    } catch (error) {
        return res.status(500).send({code: 500, message: error.message});
    }
}