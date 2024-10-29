const { where } = require("sequelize");
const db = require("../../IndexFiles/modelsIndex");
const tbl_songPlayList = db.playlistSong;
const tbl_playlist = db.playlist

//=========== create songplaylist =========//

exports.createsongPlayList = async (req, res) => {
    try{
        const {playlistName, playlistId, songId, liked, mobileNumber}= req.body;

        let userId = await db.user.findOne({
            where:{
                mobileNumber
            }
        })
        userId = userId.userId
        let checkSongId = await tbl_songPlayList.findOne({where:{
            playlistId,
            playlistName,
            songId,
            userId
        }});

        if (checkSongId && liked === true) {
            tbl_songPlayList.update({isDeleted: false}, {where: {
                userId: checkSongId.userId,
                songId: songId
            }})

            return res.status(200).send({code: 200, message: `Added To ${playlistName} Playlist`});

        } else if (checkSongId && liked === false) {
            tbl_songPlayList.update({isDeleted: true}, {where: {
                userId: checkSongId.userId,
                songId: songId
            }})

            return res.status(200).send({code: 200, message: `Removed From ${playlistName} Playlist`});
        }
        
        const data = await tbl_songPlayList.create({
            playlistName, playlistId, songId, userId
        });
        return res.status(200).send({code: 200, message: `Song Added To ${playlistName} Playlist`, data: data});
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

//==================== most plyed song =====================//

exports.updateSongPlayedCount = async (req, res) => {
    try {
      const { songId, userId} = req.body;
      
      const song = await db.playlistSong.findOne({
        where: { songId: songId,
                userId: userId
         }
      });
      if (song) {
        const currentPlayedCount = song.playedCount || 0;
        const updatedSong = await db.playlistSong.update(
          { playedCount: currentPlayedCount + 1 }, 
          { where: { songId: songId, userId: userId } }
        );
        return res.status(200).send({ code: 200, message: "Count updated successfully", data: updatedSong });
      } else {
        return res.status(404).send({ code: 404, message: "Song ID not found" });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ code: 500, message: 'Failed to update data' });
    }
  }
  
  //==================== getUpdatedPlayedCount ==================//
  exports.getUpdatedPlayedCount = async (req, res) => {
    try {
      const { userId } = req.params;
      const playlists = await db.playlist.findAll({
        where: { userId: userId },
      });
      if (!playlists) {
        return res
          .status(404)
          .send({ code: 404, message: "No playlists found." });
      }
      let songData = [];
      for(let i= 0; i < playlists.length; i++){
      const findData = await db.playlistSong.findAll({
        where: { playlistId: playlists[i].playlistId },
      });
      songData.push(findData);
    }
      for (let i = 0; i < songData.length; i++) {
        const findSong = await db.song.findOne({
          where: { songId: songData[i].songId },
        });
        if (findSong) {
          findData[i].dataValues.songUrl = findSong.songUrl;
        }
      }
      return res.status(200).send({
        code: 200,
        message: "Song played count is fetched successfully",
        data: findData,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ code: 500, message: "Server error" });
    }
  };
  
  
  //======================== api for get all updated played count ================//
  
  exports.getAllUpdatedPlayedCount = async (req, res) => {
    try{
      const data = await db.song.findAll({
        attributes:["songId", "playedCount"],
      })
      return res.status(200).send({code: 200, meassage:"song played count is fetched succesfully", data: data});
    }catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ code: 500, message: 'server error' });
    }
  }