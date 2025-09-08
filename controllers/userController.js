const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

app.use(express.json());

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const formatedUsers = users.map((user) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role
    };
  });

  if (users.length === 0) {
    return res.status(200).send();
  }

  res.status(200).json(formatedUsers);
});

exports.getUserById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User Not Found", 404));
  }

  const { id, name, email, createdAt } = user;

  res.status(200).json({ id, name, email, createdAt });
});

exports.editUser = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid review ID format", 400));
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("User Not Found", 404));
  }

  const formatedUsers = user.map((user) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role
    };
  });

  res.status(200).json(formatedUsers);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("User Not Found", 404));
  }

  res.status(204).send();
});
