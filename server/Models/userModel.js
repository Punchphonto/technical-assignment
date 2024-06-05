const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3 },
        email: { type: String, required: true, minlength: 5, unique: true },
        password: { type: String, required: true, minlength: 5, }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model("User", userSchema)
module.exports = userModel;