const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/shorten", async (req, res) => {
    const {url} = req.body;
    if (!url) {
        return res.status(400).json( { error: "URL is required" });
    }

    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});