import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import User from "../models/user.js";

dotenv.config();

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 SESSION SETUP
app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// 🔥 PASSPORT GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://ohh-idea-x.vercel.app/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {

    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
        user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
        });
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
console.log("Google auth route loaded");
// 🔥 GOOGLE ROUTES
app.get("api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("https://https://ohh-idea-x.vercel.app/index.html?login=google");
    }
);

// AI Route
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://api.anthropic.com/v1/messages",
            {
                model: "claude-3-sonnet-20240229",
                max_tokens: 1000,
                messages: [
                    { role: "user", content: userMessage }
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

export default app;