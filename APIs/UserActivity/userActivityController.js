const { where } = require("sequelize");
const db = require("../../IndexFiles/modelsIndex");

const tbl_userAtivity = db.userActivity;

// ==== createUserActivity === //

exports.createUserActivity = async (req, res) => {
  try {
    const { userId, songId, activityType } = req.body;
    const data = await tbl_userAtivity.create({ userId, songId, activityType });
    return res
      .status(200)
      .send({
        code: 200,
        message: "Created UserActivity Successfully",
        data: data,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Internal Server Error" });
  }
};

// ======== getAllUserActivity ===== //

exports.getAllUserActivity = async (req, res) => {
  try {
    const allData = await tbl_userAtivity.findAll({
      where: {
        isDeleted: false,
      },
    });
    return res
      .status(200)
      .send({
        code: 200,
        message: "get All User Activity Data",
        data: allData,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Internal Server Error" });
  }
};


// ====== getByUserActivity ===== //

exports.getByIdUserActivity = async(req , res) => {
     try {
        const {userActivityId} = req.params;
       const data = await tbl_userAtivity.findOne({
     where:{
     userActivityId : userActivityId
      }
       })
return res.status(200).send({code:200,message:"Get By User Activity Data", data:data})
     } catch (error){
return res.status(500).send({code:500,message:error.message || "Internal Server Error"})
     }
}


// ==== updateUserActivity ==== //

exports.updateUserActivity = async (req,res) =>{
     try {
          const {userActivityId} = req.params;
          const {userId, songId, activityType} = req.body;

        const data= await tbl_userAtivity.findOne({
          where:{
               userActivityId:userActivityId
          }
        })

        if(data){
          const updateData = await tbl_userAtivity.update({
               userId, songId, activityType
          },
          {
               where :{
                    userActivityId:userActivityId
               
               }
          }
     )
     return res.status(200).send({code:200,message:"User Activity Data Update Successfully", data:updateData})
         
        }else{
          return res.status(403).send({code:403,message:"Invalid Data"})
        }

     }catch(error){
       return res.status(500).send({code:500,message:"Internal Server Error"})
     }
}

// ==== deleteUserActivity ==== //

exports.deleteUserActivity = async (req , res) => {
try {
     const {userActivityId} = req.params;

     const data =await tbl_userAtivity.findOne({
          where :{
               userActivityId:userActivityId   
          }
     })
     if(data){
          const Deletedata = await tbl_userAtivity.update({
              
                    isDeleted:true
               
          },
     {
          where :{
               userActivityId:userActivityId   
          }
     }
     )
     return res.status(200).send({code:200,message:"User Activity Deleted Successfully", data:Deletedata})
     }else{
          return res.status(403).send({code:403, message:"Recorde Not Found"})
     }
     
}catch (error) {
return res.status(500).send({code:200,message:error.message || "Internal Server Error"})
}
}
