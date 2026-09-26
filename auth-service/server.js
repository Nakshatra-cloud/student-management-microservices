const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const PORT = 3001;

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Auth Service is running"
    });
});

// Login route
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Temporary login check
    if (email === "admin@gmail.com" && password === "1234") {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});