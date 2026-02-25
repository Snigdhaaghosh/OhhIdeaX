import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://api.anthropic.com/v1/messages",
            {
                model: "claude-3-sonnet-20240229",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.CLAUDE_API_KEY,
                    "anthropic-version": "2023-06-01"
                }
            }
        );

        res.json({
            reply: response.data.content[0].text
        });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ reply: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});