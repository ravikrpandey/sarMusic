const userActivityControl = require("../UserActivity/userActivityController")

module.exports = app => {
app.post("/api/createUserActivity", userActivityControl.createUserActivity);
app.get("/api/getAllUserActivity",userActivityControl.getAllUserActivity);
app.get("/api/getByUserActivity/:userActivityId", userActivityControl.getByIdUserActivity);
app.put("/api/updateUserActivity/:userActivityId", userActivityControl.updateUserActivity);
app.delete("/api/deleteUserActivity/:userActivityId", userActivityControl.deleteUserActivity)
}