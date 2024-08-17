const express = require('express'); //CommonJS
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

// routes
const authRoutes = require("./routes/auth.route");
const movieRoutes = require("./routes/movie.route");
const tvRoutes = require("./routes/tv.route.js");
const searchRoutes = require("./routes/search.route.js");

// middleware
const protectRoute = require("./middleware/protectRoute.js");

const ENV_VARS = require('./config/envVars');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT;
const _dirname = path.resolve();

app.use(express.json()); //will allow us to parse req.body
app.use(cookieParser());


// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);


if (ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
    });
}

app.get("/", (req, res) => {
    res.send("Server is ready");
});


app.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}....`);
    connectDB();
});

