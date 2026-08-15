const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const crypto = require("crypto");

const connectDB = require("./config/db");
const Url = require("./models/Url");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/shorten", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    const shortCode = crypto.randomBytes(4).toString("hex");

    try {
        const newUrl = new Url({
            url: url,
            shortCode: shortCode
        });

        await newUrl.save();

        res.status(201).json({
            id: newUrl._id,
            url: newUrl.url,
            shortCode: newUrl.shortCode,
            createdAt: newUrl.createdAt,
            updatedAt: newUrl.updatedAt,
            accessCount: newUrl.accessCount
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to shorten URL"
        });
    }
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