const validator = require("validator");
const { validate } = require("../models/user");

const validateSignUp = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName) {
        throw new Error("Enter your name");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
}

const editDataIsValid = (req) => {
    const allowedEditFields = ["firstName", "lastName", "gender", "photoUrl", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((key) => allowedEditFields.includes(key));

    return isEditAllowed;
}

module.exports = {validateSignUp, editDataIsValid };