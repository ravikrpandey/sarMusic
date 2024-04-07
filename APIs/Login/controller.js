const db = require("../../IndexFiles/modelsIndex");
const tbl_loginUser = db.user;

exports.loginUser = async (req, res) => {
    try {
        const { mobileNumber, otp, userName, type} = req.body;

        let userData = await tbl_loginUser.findOne({
            where: {
                mobileNumber: mobileNumber
            }
        });
        if (userData && mobileNumber == userData?.mobileNumber) {
            await tbl_loginUser.update({mobileNumber, otp: "1234"}, {
                where: {
                    mobileNumber: mobileNumber
                }
            })
        } else {
            await tbl_loginUser.create({
                mobileNumber, userName, type,
                otp: "1234"
            });
        }
        userData = await tbl_loginUser.findOne({
            where: {
                mobileNumber: mobileNumber
            }
        });
        if (otp == userData?.otp) {
            await db.sequelize.query(`UPDATE Users SET lastLogin = CURRENT_TIMESTAMP WHERE mobileNumber = '${mobileNumber}';
            `)
            return res.status(200).send({ code: 200, message: "user login succesfully" });
        } else {
            return res.status(403).send({ code: 403, message: "please enter valid otp" });
        }
    } catch (error) {
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error !" });
    }
};
//========================= 

exports.getLoginUser = async (req, res) => {
    try {
        const userData = await tbl_loginUser.findAll({});
        return res
            .status(200)
            .send({
                code: 200,
                message: "Data fetched successfully",
                data: userData,
            });
    } catch (error) {
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error !" });
    }
};
