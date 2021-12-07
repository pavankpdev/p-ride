// importing all the environment variables
import dotenv from "dotenv";
dotenv.config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

// DB connection instance


// Establishing DB connection


// Initializing express application
const Pride = express();

// application middleware
Pride.use(helmet());
Pride.use(express.urlencoded({ extended: false }));
Pride.use(express.json());
// Pride.use(cors());

// Server status route
Pride.get("/server-status", (req, res) => {
    res.json({ message: "Server Running" });
});

// 404 route
Pride.get("*", (req, res) => {
    res.json({ error: "Invalid Route" });
});

// Specifying the port to run the server
const port = process.env.PORT || 4000;
Pride.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});