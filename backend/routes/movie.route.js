const express = require("express");
const router = express.Router();
const controller = require("../controllers/movie.controller.js");

router.get('/trending', controller.getTrendingMovie);
router.get('/:id/trailers', controller.getMovieTrailers);
router.get('/:id/details', controller.getMovieDetails);
router.get('/:id/similar', controller.getSimilarMovies);
router.get('/:category', controller.getMoviesByCategory);

module.exports = router;