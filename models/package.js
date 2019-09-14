const Joi = require('joi');
const mongoose = require('mongoose');

const Packages = mongoose.model('Packages', new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    receiverName: {
        type: String,
        required: true
    },

    receiverMobileNo: {
        type: Number,
        required: true,
        minlength: 11,
        maxlength: 11
    },

    receiverDestination: {
        type: String,
        required: true
    },

    pickUpLocation: {
        type: String,
        required: true
    }
}));

function validatePack(pack) {
    const schema = {
        userId: Joi.number().required(),
        receiverName: Joi.string().required(),
        receiverMobileNo: Joi.number().required(),
        receiverDestination: Joi.string().required(),
        pickUpLocation: Joi.string().required()
    };
``
    return Joi.validate(pack, schema);
}

module.exports.Packages = Packages;
exports.validate = validatePack;