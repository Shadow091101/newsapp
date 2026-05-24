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
    bio: {
        type: String,
        default: "No bio"
    },
    date: {
        type: Date,
        default: () => {
            const localDate = new Date(); // Current UTC date
            const offset = localDate.getTimezoneOffset(); // Offset in minutes
            return new Date(localDate.getTime() - offset * 60 * 1000); // Adjust to local timezone
        }
    },
    backgroundColor: {
        type: String,
        default: "random"
    },
    profileImage: {
        type: String,
        default: null
    },
    articlesRead: {
        type: Number,
        default: 0
    },
    categoryStats: {
        type: Map,
        of: Number,
        default: {}
    },
    favouriteCategory: {
        type: String,
        default: "None"
    },
    readingStreak: {
        type: Number,
        default: 0
    },
    lastReadDate: {
        type: Date,
        default: null
    },
    longestStreak: {
        type: Number,
        default: 0
    }

});

const User = mongoose.model('user', UserSchema)

module.exports = User;
