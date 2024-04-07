const db = require("../../IndexFiles/modelsIndex");
const tbl_artist = db.artist;

exports.createArtist = async (req, res) => {
    try {
        const { artistName, bio, gender, artistProfileUrl,  } = req.body;

        const data = await tbl_artist.create({artistName, bio, gender, artistProfileUrl});
        return res.status(200).send({code: 200, message: 'Artist Created Successfully', data: data});

    } catch (error) {
        return res.status(500).send({code: 500, message: error.message});
    }
}

exports.getArtistById = async (req, res) => {
    try {
        const id = req.params.id;
        const getData = await tbl_artist.findOne({where: {
            artistId: id,
            isDeleted: false
        }})

        return res.status(200).send({code: 200, message: 'Artist Fetched Successfully', data: getData});

    } catch (error) {
        return res.status(500).send({code: 500, message: error.message});
    }
}
exports.getAllArtist = async (req, res) => {
    try {
        const getData = await tbl_artist.findAll({where: {
            isDeleted: false
        }})

        return res.status(200).send({code: 200, message: 'Artist Fetched Successfully', data: getData});

    } catch (error) {
        return res.status(500).send({code: 500, message: error.message});
    }
}