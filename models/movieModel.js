const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title cannot empty']
  },
  director: {
    type: String,
    required: [true, 'Director cannot empty']
  },
  releaseYear: {
    type: String,
    required:[true, 'Release year cannot empty']
  }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;