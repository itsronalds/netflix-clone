import { useState, useEffect } from 'react';
import axios from './../utils/axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => fetchData(fetchUrl), [fetchUrl]);

  const fetchData = async (fetchUrl) => {
    try {
      const response = await axios.get(fetchUrl);

      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async (movie) => {
    try {
      if (trailerUrl) {
        setTrailerUrl('');
      } else {
        const movieName =
          movie?.name ||
          movie?.original_name ||
          movie?.title ||
          movie?.original_title;

        const a = await movieTrailer(movieName);
        console.log(movie);
        const urlParams = new URLSearchParams(new URL(a).search);

        setTrailerUrl(urlParams.get('v'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
      host: 'https://www.youtube.com',
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {
          const { id, name, poster_path, backdrop_path } = movie;

          return (
            <img
              key={id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={`${baseUrl}${isLargeRow ? poster_path : backdrop_path}`}
              alt={name}
              onClick={() => handleClick(movie)}
            />
          );
        })}
      </div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
