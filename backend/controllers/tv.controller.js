const fetchFromTMDB = require("../services/tmdb.service");

const getTrendingTv = async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
        const data = await fetchFromTMDB(url);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        console.log(`Error in get trending tv show controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};
const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
        const response = await fetchFromTMDB(url);
        res.json({ success: true, trailers: response.results });

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.log(`Error in get tv show trailers controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};
const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
        const response = await fetchFromTMDB(url);

        res.status(200).json({ success: true, content: response });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.log(`Error in get tv show details controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};
const getSimilarTvs = async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        res.status(200).json({ success: true, similar: response.results });
    } catch (error) {
        console.log(`Error in get similar tv shows controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};
const getTvByCategory = async (req, res) => {
    const { category } = req.params; //popular, top_rated, airing_today, on_the_air
    try {
        const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log(`Error in get tv show by category controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal Server Error"
        });
    }
};

module.exports = { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvByCategory };