const express = require('express'); //CommonJS
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

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

app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);


app.get("/", (req, res) => {
    res.send("Server is ready");
});


app.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}....`);
    connectDB();
});

