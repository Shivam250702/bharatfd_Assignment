const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions

/**
 * Function to connect to the MongoDB database.
 * Uses environment variable MONGO_URI to establish the connection.
 */
const connectDB = async () => {
    try {
        // Ensure MONGO_URI is provided in the environment variables
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI environment variable is not set.'); // Log an error if MONGO_URI is missing
            process.exit(1); // Exit the process with a failure code (1)
        }

        // MongoDB connection options to ensure smooth connection handling
        const options = {
            useNewUrlParser: true, // Use the new URL string parser instead of the deprecated one
            useUnifiedTopology: true, // Enables the new server discovery and monitoring engine
        };

        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO_URI, options);

        console.log('Connected to MongoDB'); // Log a success message upon successful connection
    } catch (err) {
        console.error('MongoDB connection error:', err.message || err); // Log any connection errors
        process.exit(1); // Exit the process with a failure code (1)
    }
};

// Export the connectDB function to use in other parts of the application
module.exports = connectDB;
