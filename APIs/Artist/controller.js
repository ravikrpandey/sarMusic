const db = require("../../IndexFiles/modelsIndex");
const tbl_artist = db.artist;

exports.createArtist = async (req, res) => {
    try {
        const { artistName, bio, country, gender } = req.body;

        const data = await tbl_artist.create({artistName, bio, country, gender});
        return res.status(200).send({code: 200, message: 'Artist Created Successfully', data: data});

    } catch (error) {
        return res.status(500).send({code: 500, message: error.message});
    }
}

//=============== geall Artist ===================//

exports.geAllArtist = async (req , res) => {
    try{

        const findArtist = await tbl_artist.findAll({
            where: {
                isDeleted: false
            }
        });
        return res.status(200).send({code: 200, message: "All Artist fetched succesfully" , data: findArtist});
    }catch (error) {
        console.log("Error", error);
        return res.status(500).send({code: 500, message: error.message || "Internal server error"});
    }
}

//================== get artist by id ================//

exports.getArtistById = async (req , res) => {
    try{
        const {artistId}= req.params;

        const artist = await tbl_artist.findOne({
            where: {
                artistId: artistId
            }
        })
        return res.status(200).send({code: 200, message: "All Artist fetched succesfully" , data: artist});
    }catch (error) {
        console.log("Error", error);
        return res.status(500).send({code: 500, message: error.message || "Internal server error"});
    }
}

//================ update Artist =========

exports.updateArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    let data = await tbl_artist.findOne({ where: { artistId: artistId } });
    const updatedData = await tbl_artist.update(req.body, {
      where: { artistId: artistId },
      isDeleted: false,
    });
    return res
      .status(200)
      .send({
        code: 200,
        message: "Artist updated succesfully",
        data: updatedData,
      });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .send({ code: 500, message: error.message || "internal server error" });
  }
};

//=============== delete Artist ===============//

exports.deleteArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    let data = await tbl_artist.findOne({ where: { artistId: artistId } });
    const deleteData = await tbl_artist.update(
      { isDeleted: true },
      { where: { artistId: artistId } }
    );
    return res
      .status(200)
      .send({
        code: 200,
        message: "artist is deleted succesfully",
        data: deleteData,
      });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .send({ code: 500, message: error.message || "internal server" });
  }
};