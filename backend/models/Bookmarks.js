const mongoose = require('mongoose')
const { Schema } = mongoose

const BookmarkSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title: {
        type: String,
        default:"News Title"
    },
    description: {
        type: String,
        default:"News Description"
    },
    imageUrl: {
        type: String,
        default:"News Image Url"
    },
    newsUrl: {
        type: String,
        default:"News Url"
    },
    author: {
        type: String,
        default:"Author Name"
    },
    date: {
        type: Date,
    },
    source: {
        type: String,
        default:"News sources"
    },
    BookmarkDate: {
        type: Date,
        default: () => {
            const localDate = new Date(); // Current UTC date
            const offset = localDate.getTimezoneOffset(); // Offset in minutes
            return new Date(localDate.getTime() - offset * 60 * 1000); // Adjust to local timezone
        }
    }
});

const Bookmark=mongoose.model('bookmark',BookmarkSchema)

module.exports=Bookmark;
