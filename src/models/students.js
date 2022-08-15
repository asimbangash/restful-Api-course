const mongoose = require("mongoose");
const validator = require("validator");

// Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalide Email")
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    }
})

// we will creat new collection using model
const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;