const db = require("../models");
var fs = require("fs");
const User = db.user;
const Order = db.order;
const Products = db.product;


const root_folder = process.env.FOLDER_PATH;

exports.deleteFile = async(req, res) => {
    try {
        const user = await User.findById(req.headers["id-user"]);
        fs.unlinkSync(root_folder + "\\" + "uploads\\" + user.avatar);
        user.avatar = null;
        await user.save();
        return {message: "File avatar delete"};
    } catch (error) {
        return {error: 500, message: error}
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
        return { error: 500, message: error}
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
                contact: user.contact,
                wishlist: user.wishlist
            }
        })
        .catch(err => console.log(err))
    } catch (error) {
        return { error: 500, message: error}
    }
}

exports.uploadUserDitails = async(req) => {
    try {
        await User.findByIdAndUpdate(req.headers["id-user"], {contact: req.body}, {useFindAndModify: false});
        return {message: "Contacts added to user"};
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getUserOrders = async(req) => {
    try {
        const getResult = async () => await User.findOne({_id: req.headers["id-user"]});
        return getResult()
        .then((user) => {
            if (!user) { 
                return { error: 500, message: "User Not found." };
            }

            const getOrdersFromUser = async() => await Order.find({email: user.email}).populate({
                path: "items",
                populate: [{
                    path: "_id",
                    model: Products
                }]
            });
            return getOrdersFromUser()
            .then((listOrders)=>{
                return listOrders
            })
        })
        .catch(err => console.log(err))
    } catch (error) {
        return { error: 500, message: error}
    }
}