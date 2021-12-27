// importing all the environment variables
import dotenv from "dotenv";
dotenv.config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";

// Database connection
import ConnectDB from "./database/connection.js";

// Cache
import cache from "./database/cache.js";

// Routes
import Auth from "./api/auth/index.js";


// Initializing express application
const Pride = express();

// application middleware
Pride.use(helmet());
Pride.use(express.urlencoded({ extended: false }));
Pride.use(express.json());
Pride.use(cors());
Pride.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mb limit
}));


// API Routes
Pride.use("/auth", Auth);


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

cache.connect().then(() => {
    console.log("connected to cache");
});

cache.on("ready", () => {
    console.log("Cache is ready!");
});

cache.on("error", (error) => {
    console.log("Cache is not connected!");
    console.log(error);
});

Pride.listen(port, () => ConnectDB()
    .then(() => {
        console.log(`Listening on port ${port}...`);
        console.log("connected to Database");
    })
    .catch((error) => {
        console.log("Server is running, but database connection failed... ");
        console.log(error);
    })
);