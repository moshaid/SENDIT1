const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('Joi');
const mongoose = require('mongoose');

const userPro = mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    number: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true,
        unique: true

    },

    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },

    password: {
        type: String,
        maxlength: 1024
    }
});

userPro.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userPro);

function validatePack(pack) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        number: Joi.string().min(11).max(11).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().max(1024).required()
    };
    return Joi.validate(pack, schema);
}

module.exports.User = User;
module.exports.validate = validatePack;