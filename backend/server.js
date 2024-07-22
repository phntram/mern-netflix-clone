const express = require('express'); //CommonJS
const dotenv = require("dotenv");

// routes
const authRoutes = require("./routes/auth.route");
const movieRoutes = require("./routes/movie.route");
const tvRoutes = require("./routes/tv.route.js");

const ENV_VARS = require('./config/envVars');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());


// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use('/api/v1/tv', tvRoutes);


app.get("/", (req, res) => {
    res.send("Server is ready");
});


app.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}....`);
    connectDB();
});

