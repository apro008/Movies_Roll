import {API_KEY} from './config.js';
import {genres} from './genresId';

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
const getImagePath = path =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackDropPath = path =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const {results} = json;
    console.log(results);
    const movies = results.map(
      ({
        id,
        original_title,
        poster_path,
        backdrop_path,
        overview,
        release_date,
        vote_average,
        genre_ids,
      }) => ({
        key: String(id),
        title: original_title,
        poster: getImagePath(poster_path),
        backdrop: getBackDropPath(backdrop_path),
        rating: vote_average,
        description: overview,
        releaseDate: release_date,
        genres: genre_ids.map(genre => genres[genre]),
      }),
    );
    return movies;
  } catch (err) {
    console.log(err);
  }
};
