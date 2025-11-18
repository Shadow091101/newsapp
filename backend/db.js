const mongoose = require('mongoose');
require('dotenv').config();
const mongooseUrl = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongooseUrl);
        console.log("Connected to MongoDB successfully");

        // Extra: run a ping command
        await mongoose.connection.db.admin().ping();
        console.log("Pinged MongoDB: connection is alive ✅");

    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
}
module.exports=connectToMongo;