const db = require("../../IndexFiles/modelsIndex")
const tbl_song = db.song;
const tbl_album = db.album

//=============== create song  ======//

exports.createSong = async(req,res) => {
    try {
const  {albumId, albumName,  artistId, artistName, songTitle, duration, songUrl, releaseDate, genre} =req.body;

const data = await tbl_song.create({albumId, albumName,  artistId, artistName, songTitle, duration, songUrl, releaseDate, genre})
return res.status(200).send({code:200,message:'Song Created Successfully',data:data})

    }catch(error) {
        return res.status(500).send({code: 500, message: error.message || "Internal server error"});

    }
}
//================ getAll song =============//

exports.getAllSong = async (req, res) => {
    try{
        const allData = await tbl_song.findAll({
            where:{
                isDeleted: false
            }
        })
        return res.status(200).send({code:200, message: "all song fetched succesfully", data: allData});
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"})
    }
}

//================ get song by id ===============//

exports.getSongById = async (req, res) => {
    try{
        const{id}= req.params;
        const getData = await tbl_song.findOne({
            where: {
                songId: id 
            }
        })
        return res.status(200).send({code: 200, message: "song fetched succesfully", data:getData})
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"})
    }
}

//================= update song ==========//

exports.updateSong = async (req, res) => {
    try{
        const {id}= req.params;
        const {albumId, albumName,  artistId, artistName, songTitle, duration, songUrl, releaseDate, genre}= req.body;

        const data = await tbl_song.findOne({
            where: {
                songId: id
            }
        })
        if(data){
            const editData = await tbl_song.update({
                albumId, albumName,  artistId, artistName, songTitle, duration, songUrl, releaseDate, genre
            },
            {
                where: {
                    songId: id
                }
            })
            return res.status(200).send({code: 200, message: "song updated succesfully",data: editData});
        }else {
            return res.status(422).send({code: 422, message: "invalid data"});
        }
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}

//============ delete ==========//

exports.deleteSong = async (req, res) => {
    try{
        const{id}= req.params;
        const data = await tbl_song.findOne({
            where: {
                songId: id
            }
        })
        if(data){
            const updateData = await tbl_song.update({
                isDeleted: true
            },
            {
                where: {
                    songId: id
                }
            })
            return res.status(200).send({code: 200, message: "song updated succesfully",data: updateData});
        }else {
            return res.status(422).send({code: 422, message: "invalid data"});
        }
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}

//================ getSonsByAlbumId ===========//

exports.getSongsByAlbumId = async (req, res) => {
    try{
        const{albumId}= req.params;
        const data = await tbl_song.findOne({
            where: {
                albumId: albumId
            },
            include: {
                model: tbl_album
                // attributes: []
            }
        })
        return res.status(200).send({code: 200, message: "song is fetched by album id", data:data})
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}