const User = require('../models/User')
const CustomAPIError = require('../errors')
const register = async (req, res) => {
    const {email} = req.body
    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists) {
        throw new CustomAPIError.BadRequestError(`Email: ${email} already exists. Please choose another value for email`)
    }

    const isFirstAccount = await User.countDocuments({}) == 0
    const role = isFirstAccount? 'admin': 'user'
    const user = await User.create(req.body)
    return res.status(201).json(user)
}

const login = async (req, res) => {
    return res.send('login user')
};

const logout = async (req, res) => {
    return res.send('logout user')
};


module.exports = {register, login, logout}