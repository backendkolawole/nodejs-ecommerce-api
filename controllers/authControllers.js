const User = require('../models/User')
const register = async (req, res) => {
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