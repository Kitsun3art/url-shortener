const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const route = require("./routes/route");

const app = express();
app.use(express.json());

app.use(route);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to the URL Shortener API");
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
};

startServer();