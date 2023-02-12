const mongoose = require('mongoose');
require('dotenv').config();



const dbConnection = async () => {

    try {

        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Connected to Mongo successfully');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to Mongo');
        
    }

}

module.exports = {
    dbConnection
};