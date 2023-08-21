const { model, Schema } = require('mongoose');

const UserModel = model('user', Schema({
    email: String,
    password: String
}))

module.exports = { UserModel }