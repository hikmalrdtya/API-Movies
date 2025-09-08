const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const reviewRouter = require('./reviewRoutes');
const authController = require('../controllers/authController');

router.route('/')
.get(movieController.getAllMovies)
.post(authController.protect, authController.adminPermission('admin'), movieController.createMovie);

router.use('/:movieId/reviews', reviewRouter);

router.route('/:id')
.get(movieController.getMovieById)
.put(authController.protect, authController.adminPermission('admin'), movieController.editMovie)
.delete(authController.protect, authController.adminPermission('admin'), movieController.deleteMovie);

module.exports = router;