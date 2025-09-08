const express = require("express");
const app = express();
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

app.use(express.json());

exports.createReview = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const movieId = req.params.movieId;

  const reviewData = {
    rating: req.body.rating,
    comment: req.body.comment,
    movie: movieId,
    user: userId,
  };

  const newReview = await Review.create(reviewData);
  res.status(201).json(newReview);
});

exports.getAllReviewsForMovie = catchAsync(async (req, res, next) => {
  const movieId = req.params.movieId;
  const reviews = await Review.find({ movie: movieId })
    .populate("user", "name")
    .populate("movie", "title");

  const formatReview = reviews.map((r) => {
    return {
      id: r._id,
      rating: r.rating,
      comment: r.comment,
      user: {
        name: r.user.name,
      },
      movie: {
        title: r.movie.title,
      },
      createdAt: r.createdAt,
    };
  });

  res.status(200).json(formatReview);
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.reviewId)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const reviewId = req.params.reviewId;
  const review = await Review.find({ _id: reviewId })
    .populate("user", "name")
    .populate("movie", "title");

  if (!review) {
    return next(new AppError("Review Not Found", 404));
  }

  const formatReview = review.map((r) => {
    return {
      id: r._id,
      rating: r.rating,
      comment: r.comment,
      user: r.user.name,
      movie: r.movie.title,
    };
  });

  res.status(200).json(formatReview);
});

exports.editReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const loggedInUserId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError("Review with that ID not found", 404));
  }

  if (review.user.toString() !== loggedInUserId) {
    return next(
      new AppError("You do not have permission to delete this review.", 403)
    );
  }

  const updateReview = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("user", "name")
    .populate("movie", "title");

  const {
    id,
    rating,
    comment,
    createdAt,
    user: { name },
    movie: { title },
  } = updateReview;

  res.status(200).json({
    id,
    rating,
    comment,
    name,
    title,
    createdAt,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const loggedInUserId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError("Review with that ID not found", 404));
  }

  if (review.user.toString() !== loggedInUserId) {
    return next(
      new AppError("You do not have permission to delete this review.", 403)
    );
  }

  await Review.findByIdAndDelete(reviewId);

  res.status(204).send();
});
