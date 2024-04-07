  const db = require("../../IndexFiles/modelsIndex");

  const tbl_userAtivity = db.userActivity;

  // ==== createUserActivity === //

  exports.createUserActivity = async(req,res) => {
    try {
         const {userId, songId, activityType} =req.body;
         const data = await tbl_userAtivity.create({userId, songId, activityType});
         return res.status(200).send({code:200, message:"Created UserActivity Successfully", data: data})
    } catch (error){
         return res.status(500).send({code:200, message:error.message || "Internal Server Error"})
    }

  }
