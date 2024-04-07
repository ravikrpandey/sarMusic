const db = require("../../IndexFiles/modelsIndex");
const tbl_songPlayList = db.playlistSong;
const tbl_playlist = db.playlist

//=========== create songplaylist =========//

exports.createsongPlayList = async (req, res) => {
    try{
        const {songPlaylistName, playlistId, userId}= req.body;

        const data = await tbl_songPlayList.create({
            songPlaylistName, playlistId, userId
        });
        return res.status(200).send({code: 200, message: "songPlaylist created succesfully", data: data});
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}

//========== get songPlaylist ==============//

exports.getSonPlayList = async (req , res)=>{
 try{
    const getData = await tbl_songPlayList.findAll({
        where:{
            isDeleted:false,
            // songPlaylistName: "Sad song"
        },
        // include: [{
        //     model: tbl_playlist,
        //     attributes: {
        //         exclude: ['playlistName']
        //     }
        // }]
    })
return res.status(200).send({code:200,message:"All Song Playlist Fetched Successfully", data:getData })
 }catch(error){
    return res.status(500).send({code: 500, message: error.message || "internal server error"});
 }
}

//=============== get songplaylist by id ========//

exports.getSongPlaylistById = async (req, res) => {
    try{
        const {id}= req.params;
        const data = await tbl_songPlayList.findOne({
            where: {
                playlistSongId: id
            }
        });
        return res.status(200).send({code: 200, message: "song playlist is fetched succesfully", data: data});
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}

//============ update songplaylist ==============//

exports.updateSonPlaylist = async (req, res) => {
    try{
    const {playlistSongId}= req.params;
    const {songPlaylistName, playlistId, userId}= req.body;

    const data = tbl_songPlayList.findOne({
        where: {
            playlistSongId: playlistSongId,
            isDeleted: false
        }
    })
    if(data){
        const updateData = await tbl_songPlayList.update({
            songPlaylistName, playlistId, userId
        },
        {
        where:{
            playlistSongId: playlistSongId
        }
    })
    const updatedData2 = await tbl_songPlayList.findOne({
       where: { 
        playlistSongId: playlistSongId
       }
    });
    return res.status(200).send({code: 200, message: "songplaylist updated succesfully", data: updatedData2});
    }else {
        return res.status(422).send({code: 422, message: "invalid data"});
    }
    }catch (error) {
     return res.status(500).send({code: 500, message: error.message || "Internal server error"});
    }
}

// ===== delete songPlayList === //

exports.deleteSongPlayList= async (req , res) =>{
    try {
        const {playlistSongId}= req.params;

        const data = await tbl_songPlayList.findOne({
            playlistSongId : playlistSongId,
            isDeleted:false
        })
        if(data){
        const deleted= await tbl_songPlayList.update({
            isDeleted:true
        },
        {where:{
            playlistSongId : playlistSongId,
        }
        })
        const showDelteData = await tbl_songPlayList.findOne({
            where: {
                playlistSongId : playlistSongId,
            }
        })
        return res.status(200).send({code:200,message:"Data deleted Successfully", data:showDelteData});
}else{
    return res.status(422).send({code: 422, message: "invalid data"});
}
    } catch (error) {
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}