const userActivityControl = require("../UserActivity/userActivityController")

module.exports = app => {
app.post("/api/createUserActivity", userActivityControl.createUserActivity)
}