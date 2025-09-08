const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router.route('/')
.get(reviewController.getAllReviewsForMovie)
.post(authController.protect, reviewController.createReview);

router.route('/:reviewId')
.get(reviewController.getReviewById)
.put(authController.protect, reviewController.editReview)
.delete(authController.protect, reviewController.deleteReview);

module.exports = router;
