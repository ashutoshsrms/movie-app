const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectToDatabase = require('./db');
const cors =require('cors');
const port = process.env.PORT || 3000;

connectToDatabase('mongodb://localhost:27017/mobiesdb');

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Movie App" });
  });


// importing routes
const movieRoutes = require('./routes/movie.routes');
const genreRoutes = require('./routes/genre.routes');
const artistRoutes = require('./routes/artist.routes');

//using the routes

app.use('/api', movieRoutes);
app.use('/api', genreRoutes);
app.use('/api', artistRoutes);

app.listen(port, () => console.log(`listening on port ${port}!`))