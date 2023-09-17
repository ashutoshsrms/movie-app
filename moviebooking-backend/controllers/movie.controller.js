const Movie = require('../models/movie.model');

const findAllMovies = async (req, res) => {
  try {
    const status = req.query.status || '';
    const query = {};

    if (status == 'published') {
      query.published = true;
    } else if (status == 'released') {
      query.released = true;
    }
    const movies = await Movie.find();

    console.log(movies);
    if (movies.length === 0) {
      return res.status(404).json({ error: 'No movies found with the given status' });
    }

    res.status(200).json(movies);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

const findOne = async (req, res) => {
  try {
    
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

const findShows = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const shows = movie.shows;
    console.log(movie);
    console.log(shows);
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  findAllMovies,
  findOne,
  findShows
};