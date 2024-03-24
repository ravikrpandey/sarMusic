const db = require("../../IndexFiles/modelsIndex");
const tbl_loginUser = db.tbl_loginUser;

exports.loginUser = async (req, res) => {
    try {
        const { mobile_number, otp } = req.body;

        let userData = await tbl_loginUser.findOne({
            where: {
                mobile_number: mobile_number
            }
        });
        if (userData && mobile_number == userData?.mobile_number) {
            await tbl_loginUser.update({mobile_number, otp: "1234"}, {
                where: {
                    mobile_number: mobile_number
                }
            })
        } else {
            await tbl_loginUser.create({
                mobile_number,
                otp: "1234"
            });
        }
        userData = await tbl_loginUser.findOne({
            where: {
                mobile_number: mobile_number
            }
        });
        if (otp == userData?.otp) {
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
