const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./model/user');

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB...");
        
        const result = await User.deleteMany({ role: 'doctor' });
        console.log(`Successfully removed ${result.deletedCount} default doctors!`);
        
        process.exit(0);
    } catch (error) {
        console.error("Cleanup Error:", error.message);
        process.exit(1);
    }
};

cleanup();
