import mongoose from 'mongoose'

const connectDB = async (db) => {
    try {
        //database Name
        //const databaseName='cookbook';
        const con = await mongoose.connect(db, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB