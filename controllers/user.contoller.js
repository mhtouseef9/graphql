const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 //Node.js natively does not load .env files, so we must utilize the dotenv package to load the file and expose the values via process.env.
require('dotenv').config();

// resolver functions
exports.listUsers = async function(args) {
    let users = await User.find();
    return users;
}
exports.createUser = async function(_, { input }) {
    // pattern matching
    const { first_name, last_name, email, password } = input;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return {firstName: "User Already Exist. Please Login"};
    }
    var passwordHash = await bcrypt.hash(input.password, 10);
    input.passwordHash = passwordHash;
    let user = await User.create(input)
    let token = generateJwt(user)
    return userView(user, token);
}

exports.login = async (req, res) => {
     const { email, password } = req.body;
     const user = await  User.findOne({email});
     if (user && await bcrypt.compare(password, user.passwordHash)) {
         let token = generateJwt(user)
         res.status(200).send(userView(user, token));
     }
     else
     {
         res.status(400).send("Invalid Credentials");
     }
}

generateJwt = (user) => {
    return jwt.sign(
        { user: user },
        process.env.JWT_SECRET_KEY
        // {
        //     expiresIn: "2h",
        // }
    );
}

userView = (user, token) => {
    return  {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token
    };
}
