const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());

app.use(express.json());

const PORT = 3002;

// PostgreSQL connection
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "studentsdb"
});

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Service is running"
    });
});

// Get all students
app.get("/students", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM students ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database error"
        });
    }
});

// Add student
app.post("/students", async (req, res) => {

    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "Name, email and course are required"
        });
    }

    try {

        const result = await pool.query(
            "INSERT INTO students (name, email, course) VALUES ($1, $2, $3) RETURNING *",
            [name, email, course]
        );

        res.status(201).json({
            message: "Student added successfully",
            student: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database error"
        });
    }
});

// Delete student
app.delete("/students/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    try {

        await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Student Service running on port ${PORT}`);
});