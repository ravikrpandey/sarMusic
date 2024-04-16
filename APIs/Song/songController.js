const db = require("../../IndexFiles/modelsIndex")
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const tbl_song = db.song;
const tbl_artist = db.artist;
const tbl_playlist = db.playlist;
const tbl_songPlayList = db.playlistSong;
const tbl_loginUser = db.user;
const tbl_album = db.album;
const ytdl = require('ytdl-core');
const { exec } = require('child_process');

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
    try{
        const{id}= req.params;
        const getData = await tbl_song.findOne({
            where: {
                songId: id,
                isDeleted: false
            }
        })
        return res.status(200).send({ code: 200, message: "song fetched succesfully", data: getData })
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "internal server error" })
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
            return res.status(200).send({code: 200, message: "Song updated succesfully",data: editData});
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
        const [data] = await db.sequelize.query(`select s.songTitle, s.songId, s.songUrl, s.artistName from songs s where albumId = '${albumId}' and isDeleted = false;`)
        return res.status(200).send({code: 200, message: "song is fetched by album id", data:data})
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
    }
}

//======= getAll song count ==========//

exports.getAllDashboardCount = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
  
      const start = startDate ? new Date(startDate) : new Date();
      let end = endDate ? new Date(endDate) : new Date();
  
      if (end < start) {
        return res.status(400).send({ code: 400, message: "End date cannot be before start date" });
      }
  
      //####### Adjust end date to include the full day if it's the same as the start date ########//
      end = new Date(end.getTime() + (24 * 60 * 60 * 1000) - 1);
  
      //############ Get the counts for each entity within the specified date range ############//
      const songCountInRange = await tbl_song.count({
        where: {
          isDeleted: false,
          createdAt: {
            [Op.between]: [start, end],
          }
        }
      });
  
      const artistCountInRange = await tbl_artist.count({
        where: {
          isDeleted: false,
          createdAt: {
              [Op.between]: [start, end],
            }
        },
      });
  
      const playlistCountInRange = await tbl_playlist.count({
        where: {
          isDeleted: false,
          createdAt: {
              [Op.between]: [start, end],
            }
        },
      });
  
      const albumCountInRange = await tbl_album.count({
        where: {
          isDeleted: false,
          createdAt: {
              [Op.between]: [start, end],
            }
        },
      });
  
      const playlistSongCountInRange = await tbl_songPlayList.count({
        where: {
          isDeleted: false,
          createdAt: {
              [Op.between]: [start, end],
            }
        },
      });
  
      const uniqueUserInRange = await tbl_loginUser.count({
        distinct: true,
        col: 'mobileNumber',
        where: {
          mobileNumber: {
            [Op.ne]: null
          },
          createdAt: {
              [Op.between]: [start, end],
            }
        }
      });
  
      const totalSongCount = await tbl_song.count({ where: { isDeleted: false } });
      const totalArtistCount = await tbl_artist.count({ where: { isDeleted: false } });
      const totalPlaylistCount = await tbl_playlist.count({ where: { isDeleted: false } });
      const totalAlbumCount = await tbl_album.count({ where: { isDeleted: false } });
      const totalPlaylistSongCount = await tbl_songPlayList.count({ where: { isDeleted: false } });
      const totalUniqueUser = await tbl_loginUser.count({ distinct: true, col: 'mobileNumber', where: { mobileNumber: { [Op.ne]: null } } });
  
      return res.status(200).send({
        code: 200,
        message: "All Dashboard count is fetched successfully",
        songCountInRange: songCountInRange,
        artistCountInRange: artistCountInRange,
        playlistCountInRange: playlistCountInRange,
        albumCountInRange: albumCountInRange,
        playlistSongCountInRange: playlistSongCountInRange,
        uniqueUserInRange: uniqueUserInRange,
        totalSongCount: totalSongCount,
        totalArtistCount: totalArtistCount,
        totalPlaylistCount: totalPlaylistCount,
        totalAlbumCount: totalAlbumCount,
        totalPlaylistSongCount: totalPlaylistSongCount,
        totalUniqueUser: totalUniqueUser
      });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message || "internal server error" });
    }
  };
  

//============== getSOngUrlByYoutubeLink===============

exports.getSongUrlByYoutubeLink = async (req, res) => {
    try {


async function getDirectAudioUrl(youtubeUrl) {
  return new Promise((resolve, reject) => {
    const command = `youtube-dl -g -f bestaudio "${youtubeUrl}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      const audioUrl = stdout.trim();
      resolve(audioUrl);
    });
  });
}

// Example usage
const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
getDirectAudioUrl(youtubeUrl)
  .then(audioUrl => {
    console.log('Direct audio URL:', audioUrl);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ code: 500, message: 'Failed to get audio URL' });
    }
};

// async function getDirectAudioUrl(youtubeUrl) {
//     return new Promise((resolve, reject) => {
//         const videoId = ytdl.getURLVideoID(youtubeUrl);
//         ytdl.getInfo(videoId, (err, info) => {
//             if (err) {
//                 console.error('Error fetching video info:', err);
//                 reject(err);
//                 return;
//             }

//             const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
//             if (!audioFormat) {
//                 reject(new Error('No audio stream found'));
//                 return;
//             }

//             resolve(audioFormat.url);
//         });
//     });
// }

//############## get song by user id playlistid #################//

exports.getSongsPlayListById = async (req, res) => {
    try{
        const {userId, playlistId}= req.params;

        const playlistData = await tbl_playlist.findOne({
            where: {
                playlistId: playlistId,
                userId: userId,
                isDeleted: false
            }
        });
        return res.status(200).send({code:200, message: "user and playlist is fetched succesfully", data: playlistData})
    }catch (error) {
      return res.status(500).send({ code: 500, message: error.message || "internal server error" });
    }
}
