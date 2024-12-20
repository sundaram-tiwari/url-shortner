const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = connectMongoDB;
