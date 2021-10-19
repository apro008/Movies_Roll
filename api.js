import React from 'react';

import {API_KEY} from './config.js';
import {genres} from './genresId';
import {getImagePath, getBackDropPath} from './component/ImagePath';

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
//const API_URL_MOVIE_ID = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=0ae4ef1a9d1bdee0bb3b899e0c1b8335&language=en-US`

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

// export const MoviesSearch = async () => {
//   try {
//     const response = await fetch(API_URL_SEARCH);
//     const json = await response.json();
//     const {results} = json;
//     console.log(results);
//     const SeMovies = results.map(
//       ({
//         id,
//         original_title,
//         poster_path,
//         backdrop_path,
//         overview,
//         release_date,
//         vote_average,
//         genre_ids,
//       }) => ({
//         key: String(id),
//         title: original_title,
//         poster: getImagePath(poster_path),
//         backdrop: getBackDropPath(backdrop_path),
//         rating: vote_average,
//         description: overview,
//         releaseDate: release_date,
//         genres: genre_ids.map(genre => genres[genre]),
//       }),
//     );
//     return SeMovies;
//   } catch (err) {
//     console.log(err);
//   }
// };
