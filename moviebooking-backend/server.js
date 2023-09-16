const express = require('express');
const app = express();
const { MONGO_URL} = require('./config/config');
const connectToDatabase = require('./db');
const cors =require('cors');
const port = process.env.PORT || 3000;

connectToDatabase(MONGO_URL);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Movie App" });
  });


// importing routes
const movieRoutes = require('./routes/movie.routes');
const genreRoutes = require('./routes/genre.routes');
const artistRoutes = require('./routes/artist.routes');
const authRoutes =require('./routes/user/auth.routes');

//using the routes

app.use('/api', movieRoutes);
app.use('/api', genreRoutes);
app.use('/api', artistRoutes);
app.use('/api/auth',authRoutes);

app.listen(port, () => console.log(`listening on port ${port}!`))