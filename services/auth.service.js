const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = async (req) => {
    const getResult = async () => await User.findOne({email: req.body.email}).populate("roles", "-__v");
    return getResult()
    .then((user) => {

        if (!user) { 
            return { error: 500, message: "User Not found." } 
        }

        var passwordIsValid = bcrypt.compareSync( req.body.password, user.password );

        if (!passwordIsValid) {
            return {error: 500, message: "Invalid Password!"}
        }

        var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
            expiresIn: 60*60//86400 // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        return {
            id: user._id,
            email: user.email,
            userToken: token
        }
    });
}
exports.register = (req) => {
    const {firstName, email, password} = req.body;

    const user = new User({
        username: req.body.firstName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
        //res.status(500).send({ message: err });
        return { error: 500, message: err };
        }

        if (req.body.roles) {
            Role.find(
                {
                name: { $in: req.body.roles }
                },
                (err, roles) => {
                if (err) {
                    //res.status(500).send({ message: err });
                    return { error: 500, message: err };
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                    if (err) {
                    //res.status(500).send({ message: err });
                    return { error: 500, message: err };
                    }

                    //res.send({ message: "User was registered successfully!" });
                    return { error: 500, message: "User was registered successfully!" };
                });
                }
            );
        }
        else 
        {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    //res.status(500).send({ message: err });
                    return { error: 500, message: err };
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                    //res.status(500).send({ message: err });
                    return { error: 500, message: err };
                    }
                    //res.send({ message: "User was registered successfully!" });
                    return { error: 500, message: "User was registered successfully!" };
                });
            });
        }
    });
};

