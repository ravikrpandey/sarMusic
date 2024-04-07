const db = require("../../IndexFiles/modelsIndex")
const tbl_song = db.song;

//=============== create song  ======//

exports.createSong = async (req, res) => {
    try {
        const { albumId, albumName, artistId, artistName, songTitle, duration, songUrl, releaseDate, genre, albumCardUrl } = req.body;

        const data = await tbl_song.create({ albumId, albumName, artistId, artistName, songTitle, duration, songUrl, releaseDate, genre, albumCardUrl })
        return res.status(200).send({ code: 200, message: 'Song Created Successfully', data: data })

    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Internal server error" });

    }
}
//================ getAll song =============//

exports.getAllSong = async (req, res) => {
    try {
        const allData = await tbl_song.findAll({
            where: {
                isDeleted: false
            }
        })
        return res.status(200).send({ code: 200, message: "all song fetched succesfully", data: allData });
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "internal server error" })
    }
}

//================ get song by id ===============//

exports.getSongById = async (req, res) => {
    try {
        const { songId } = req.body;
        const getData = await tbl_song.findOne({
            where: {
                songId: songId
            }
        })
        return res.status(200).send({ code: 200, message: "song fetched succesfully", data: getData })
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "internal server error" })
    }
}