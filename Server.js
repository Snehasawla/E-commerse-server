const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

//CONNECT TO MONGOdb
connectDB();


//Define Routes and API
app.use("/api/users", require("./routes/userAPI"));
app.use("/api/products", require("./routes/productsAPI"));

app.get('/', (req, res) => {
    res.send("My App is Up!!")
})


app.listen(PORT, () => {
    console.log(`App is Listening on Port : ${PORT}`)
});