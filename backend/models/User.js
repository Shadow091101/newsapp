const { type } = require('@testing-library/user-event/dist/type')
const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => {
            const localDate = new Date(); // Current UTC date
            const offset = localDate.getTimezoneOffset(); // Offset in minutes
            return new Date(localDate.getTime() - offset * 60 * 1000); // Adjust to local timezone
        }
    }
});

const User=mongoose.model('user',UserSchema)

module.exports=User;
