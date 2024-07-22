// just get one trending movie

const fetchFromTMDB = require("../services/tmdb.service");

const getTrendingMovie = async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const data = await fetchFromTMDB(url);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({
            success: true,
            data: {
                randomMovie
            }
        });
    } catch (error) {
        console.log(`Error in get trending movie controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};

const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
        const response = await fetchFromTMDB(url);
        res.status(200).json({
            success: true,
            data: response.results
        });

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.log(`Error in get movie trailers controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const response = await fetchFromTMDB(url);

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.log(`Error in get movie details controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};

const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        res.status(200).json({
            success: true,
            data: response.results
        });
    } catch (error) {
        console.log(`Error in get similar movies controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};

const getMoviesByCategory = async (req, res) => {
    const { category } = req.params; //popular, top_rated, now_playing, upcoming
    try {
        const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        res.status(200).json({
            success: true,
            data: response.results
        });
    } catch (error) {

    }
};

module.exports = { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory };