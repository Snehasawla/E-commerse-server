const mongoos = require("mongoose");
const config = require("./key");
const db = config.mongoURL;

const connectDB = async () => {
    try {
        await mongoos.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("database connected!")
    } catch(err){
        console.log("connection Failed!!");
        process.exit(1);
    }
};

module.exports = connectDB ;