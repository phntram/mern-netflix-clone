const User = require("../models/user.model.js");
const fetchFromTMDB = require("../services/tmdb.service.js");

const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        if (response.results.length === 0) {
            return res.statsu(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({
            success: true,
            data: response.results
        });
    } catch (error) {
        console.log(`Error in search person controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        if (response.results.length === 0) {
            return res.statsu(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({
            success: true,
            data: response.results
        });
    } catch (error) {
        console.log(`Error in search movie controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const searchTv = async (req, res) => {
    const { query } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
        const response = await fetchFromTMDB(url);

        if (response.results.length === 0) {
            return res.statsu(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({
            success: true,
            data: response.results
        });
    } catch (error) {
        console.log(`Error in search tv controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user.searchHistory
        });
    } catch (error) {
        console.log(`Error in get search history controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const removeItemFromSearchHistory = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            }
        });

        res.status(200).json({
            success: true,
            message: "Item removed from search history"
        });
    } catch (error) {
        console.log(`Error in removeItemFromSearchHistory controller ${error.message}`);
        res.statsu(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory };