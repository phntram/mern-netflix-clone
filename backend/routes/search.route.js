const express = require("express");
const router = express.Router();
const controller = require("../controllers/search.controller.js");

router.get('/person/:query', controller.searchPerson);
router.get('/movie/:query', controller.searchMovie);
router.get('/tv/:query', controller.searchTv);
router.get('/history', controller.getSearchHistory);
router.delete('/history/:id', controller.removeItemFromSearchHistory);

module.exports = router;