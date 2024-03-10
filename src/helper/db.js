import mongoose from "mongoose";


const configDB = {
    isConnected: 0
}
// Database connection function
export const connectDB = async () => {
    if (configDB.isConnected === 1) {
        return;
    }

    try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "work-manager",
        });
        // console.log(connection);
        configDB.isConnected = connection.readyState;
        console.log("Database connected successfully !!!");
    }
    catch (error) {
        console.log(`Error connecting to the database : ${error}`);
    }
}