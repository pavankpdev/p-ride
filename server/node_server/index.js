import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import ConnectDB from "./database/connection.js";

import cache from "./database/cache.js";

// Routes
import Auth from "./api/auth/index.js";
import Map from "./api/map/index.js";

const Pride = express();


Pride.use(helmet());
Pride.use(express.urlencoded({ extended: false }));
Pride.use(express.json());
Pride.use(cors());
Pride.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mb limit
  })
);

// API Routes
Pride.use("/auth", Auth);
Pride.use("/map", Map);

Pride.get("/server-status", (req, res) => {
  res.json({ message: "Server Running" });
});

Pride.get("*", (req, res) => {
  res.json({ error: "Invalid Route" });
});

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

Pride.listen(port, () =>
  ConnectDB()
    .then(() => {
      console.log(`Listening on port ${port}...`);
      console.log("connected to Database");
    })
    .catch((error) => {
      console.log("Server is running, but database connection failed... ");
      console.log(error);
    })
);
