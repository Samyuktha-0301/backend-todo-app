const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const routes = require('./routes/Todoroute');
const auth = require('./routes/auth');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

const connectThis = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo connected");
    } catch (err) {
        console.log(err);
    }
};

// Use CORS middleware before defining your routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST','PUT','DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

app.use(express.json());
app.use("/api", auth);
app.use("/route", routes);

app.listen(PORT, () => {
    connectThis();
    console.log(`Listening on: ${PORT}`);
});
