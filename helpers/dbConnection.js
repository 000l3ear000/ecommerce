import mongoose from 'mongoose';

const dbConnection = () => {
    
    if ( mongoose.connections[0].readyState ){
        console.log("already connected to database");
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on("connected", () => {
        console.log("connected to database");
    })
    mongoose.connection.on("error", (err) => {
        console.log("error connecting to database", err);
    })

}

export default dbConnection
