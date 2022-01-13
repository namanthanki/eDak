import mongoose from "mongoose";

const connectDatabase = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(`Connected to Database: ${connection.connection.host}`);
}

export { connectDatabase };