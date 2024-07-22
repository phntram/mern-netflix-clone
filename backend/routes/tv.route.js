const express = require('express');
const router = express.Router();
const controller = require("../controllers/tv.controller.js");

router.get('/trending', controller.getTrendingTv);
router.get('/:id/trailers', controller.getTvTrailers);
router.get("/:id/details", controller.getTvDetails);
router.get("/:id/similar", controller.getSimilarTvs);
router.get("/:category", controller.getTvByCategory);

module.exports = router;