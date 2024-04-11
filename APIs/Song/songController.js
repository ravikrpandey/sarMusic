const db = require("../../IndexFiles/modelsIndex")
const tbl_song = db.song;
const tbl_album = db.album
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
                songId: id 
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
        const [data] = await db.sequelize.query(`select s.songTitle, s.songUrl, s.artistName from songs s where albumId = '${albumId}' and isDeleted = false;`)
        return res.status(200).send({code: 200, message: "song is fetched by album id", data:data})
    }catch (error){
        return res.status(500).send({code: 500, message: error.message || "internal server error"});
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
