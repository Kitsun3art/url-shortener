const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// POST /api/shorten - Create a new shortened URL
router.post("/api/shorten", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    try {
        let shortCode;
        let existingUrl;

        do {
            shortCode = require("crypto").randomBytes(4).toString("hex");
            existingUrl = await Url.findOne({ shortCode });
        } while (existingUrl);

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

// GET /api/shorten/:shortCode - Retrieve URL details by short code
router.get("/api/shorten/:shortCode", async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        res.status(200).json({
            id: url._id,
            url: url.url,
            shortCode: url.shortCode,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
            accessCount: url.accessCount
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve URL"
        });
    }
});


// PUT /api/shorten/:shortCode - Update an existing shortened URL
router.put("/api/shorten/:shortCode", async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;

     if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    try {
                const updatedUrl = await Url.findOneAndUpdate(
            { shortCode },
            {
                url,
                updatedAt: new Date()
            },
            {
                new: true
            }
        );

        if (!updatedUrl) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        res.status(200).json({
            id: updatedUrl._id,
            url: updatedUrl.url,
            shortCode: updatedUrl.shortCode,
            createdAt: updatedUrl.createdAt,
            updatedAt: updatedUrl.updatedAt,
            accessCount: updatedUrl.accessCount
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update URL"
        });
    }
});


// DELETE /api/shorten/:shortCode - Delete a shortened URL
router.delete("/api/shorten/:shortCode", async (req, res) => {
    const { shortCode } = req.params; // Extract the shortCode from the request parameters

    try {
        const deletedUrl = await Url.findOneAndDelete({ shortCode }); // Find and delete the URL document with the given shortCode

        if (!deletedUrl) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete URL"
        });
    }
});

// GET /:shortCode - Redirect to the original URL and increment access count
router.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        url.accessCount += 1;
        await url.save();

        res.redirect(url.url);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to redirect"
        });
    }
});

// GET /api/shorten/:shortCode/stats - Retrieve statistics for a shortened URL
router.get("/api/shorten/:shortCode/stats", async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        res.status(200).json({
            id: url._id,
            url: url.url,
            shortCode: url.shortCode,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
            accessCount: url.accessCount
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve URL"
        });
    }
});



module.exports = router;
