const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = () => {
    try {
        return "Public Content."
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.getFiles = () => {
    try {
        return "Public Content."
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.uploadFiles = () => {
    try {
        return "Public Content."
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.getUsers = async (req) => {
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
        }
    });
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}