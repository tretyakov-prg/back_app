const db = require("../models");
const path = require('path');
var fs = require("fs");
const User = db.user;
const Role = db.role;

const root_folder = process.env.FOLDER_PATH;

exports.deleteFile = async(req, res) => {
    try {
        const user = await User.findById(req.headers["id-user"]);
        fs.unlinkSync(root_folder + "\\" + "uploads\\" + user.avatar);
        user.avatar = null;
        await user.save();
        return {message: "File avatar delete"};
    } catch (error) {
        return {message: error}
    }
}

exports.uploadFile = async (req) => {
    try {
        const file = req.file.filename;
        const user = await User.findById(req.headers["id-user"]);
        user.avatar = file;
        await user.save();
        return {message: "File avatar Upload"};
    } catch (error) {
        return {message: error}
    }
}

exports.getUserDitails = async(req) => {
    try {
        const getResult = async () => await User.findOne({_id: req.headers["id-user"]}).populate("roles", "-__v");
        return getResult()
        .then((user) => {

            if (!user) { 
                return { error: 500, message: "User Not found." } 
            }

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            return {
                email: user.email,
                roles: authorities,
                avatar: user.avatar,
                contact: user.contact
            }
        })
        .catch(err => console.log(err))
    } catch (error) {
        return {message: error}
    }
}

exports.uploadUserDitails = async(req) => {
    try {

        const user = await User.findByIdAndUpdate(req.headers["id-user"], {contact: req.body}, {useFindAndModify: false});
        console.log(user)
        //user.contact = req.body;
        //await user.save();
        return {message: "Contacts added to user"};
    } catch (error) {
        return {message: error}
    }
}