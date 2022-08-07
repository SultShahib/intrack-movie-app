import { useEffect, useState } from "react";
import SingleContent from "../../components/content/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";
import axios from "axios";
import Genres from "../../components/genres/Genres";
import "./Home.css";
import useGenres from "../../hooks/useGenre";

export const API_KEY = "5e83d3463b244867eab265ed5e141d03";

const Home = () => {
  const [movieData, setMovieData] = useState();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenre] = useState([]);
  const genreForUrl = useGenres(selectedGenre);

  const getMovies = async (API) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`
      );

      // console.log(data);
      setMovieData(data.results);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    getMovies(API_KEY);
    // eslint-disable-next-line
  }, [page, selectedGenre]);

  console.log(movieData);

  return (
    <>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        selectedGenre={selectedGenre}
        genres={genres}
        setGenre={setGenre}
        setSelectedGenre={setSelectedGenre}
        setPage={setPage}
      />
      <div className="popular">
        {movieData &&
          movieData.map((item) => {
            // console.log(item);3
            return (
              <SingleContent
                key={item.id}
                item={item}
                title={item.original_title}
                date={item.release_date}
                poster={item.poster_path}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Home;
