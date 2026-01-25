const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const port = process.env.PORT;

app.use(cors({
    origin: process.env.ORIGIN_SITE,
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Origin"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ]
})
);

app.use(express.json());

app.get("/reset", async(req, res) => {
    try {
        await db.sync({ force: true });
        return res.status(200).send("Database reseted succesfully");
    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
})

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
