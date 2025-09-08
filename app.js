require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("Database Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server Running in http://localhost:${process.env.PORT}`);
  });
}).catch(err => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.status(200).send("hello");
})

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/movies/:movieId', reviewRoutes);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
});