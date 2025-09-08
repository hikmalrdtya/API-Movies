const express = require("express");
const mongoose = require("mongoose");
const app = express();
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const Movie = require("../models/movieModel.js");

app.use(express.json());

exports.createMovie = catchAsync(async (req, res, next) => {
  const newMovie = await Movie.create({
    title: req.body.title,
    director: req.body.director,
    releaseYear: req.body.releaseYear,
  });

  res.status(201).json({
    status: "Success",
    data: {
      newMovie,
    },
  });
});

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();

  if (movies.length === 0) {
    return res.status(200).send();
  }

  res.status(200).json(movies);
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new AppError("Movie Not Found", 404));
  }

  const { _id, title, director, releaseYear } = movie;

  res.status(200).json({ _id, title, director, releaseYear });
});

exports.editMovie = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError("Movie Not Found", 404));
  }

  const { _id, title, director, releaseYear } = movie;

  res.status(200).json({ _id, title, director, releaseYear });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError("Movie Not Found", 404));
  }

  res.status(204).send();
});
