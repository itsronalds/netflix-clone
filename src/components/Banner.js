import { useState, useEffect } from 'react';
import axios from './../utils/axios';
import requests from './../utils/requests';

const baseUrl = 'https://image.tmdb.org/t/p/original/';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const { title, name, original_name, backdrop_path, overview } = movie;

  useEffect(() => fetchData(), []);

  const fetchData = async () => {
    try {
      const response = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    } catch (err) {
      console.error(err);
    }
  };

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + '...' : str;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${baseUrl}${backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{title || name || original_name}</h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">{truncate(overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
