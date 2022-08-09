import { useEffect, useState } from "react";
import SingleContent from "../../components/content/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";
import axios from "axios";
import Genres from "../../components/genres/Genres";
import "./Home.css";
import useGenres from "../../hooks/useGenre";

export const API_KEY = "5e83d3463b244867eab265ed5e141d03";

// Default view of page
// Renders the Movies (SingleContent) and genres and Modal

const Home = () => {
  const [movieData, setMovieData] = useState();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenre] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  // Checks to see if the selectedGenre is present (user selects a genre)
  // If so it will be used in the API call in getMovies to GET movies with that genre
  const genreForUrl = useGenres(selectedGenre);

  // getMovies function makes an API call (using axios) to make GET request to themoviedb.
  // The data is received and stored into movieData (setMovieData)
  // Number of pages is stored into numOfPages (setNumOfPages)

  const getMovies = async (API) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`
      );

      setMovieData(data.results);
      setNumOfPages(data.total_pages);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  // UseEffect is used to call the getMovies
  // Will be called if the page changes or user selects genre changes

  useEffect(() => {
    getMovies(API_KEY);
    // eslint-disable-next-line
  }, [page, selectedGenre]);

  return (
    <>
      <span className="pageTitle">Discover Movies</span>
      {/* Genres Component is rendered here*/}
      <Genres
        selectedGenre={selectedGenre}
        genres={genres}
        setGenre={setGenre}
        setSelectedGenre={setSelectedGenre}
        setPage={setPage}
      />
      <div className="movies">
        {/* Checks to see if movieData is loaded from getMovies
        // Then renders the SingleContent component to display movie content
         */}
        {movieData &&
          movieData.map((item) => {
            return (
              <SingleContent
                key={item.id}
                id={item.id}
                item={item}
                title={item.original_title}
                date={item.release_date}
                poster={item.poster_path}
              />
            );
          })}
      </div>
      {/* Displays the number of pages */}
      <CustomPagination
        numOfPages={numOfPages > 20 ? 20 : numOfPages}
        // checks to see if the numOfPages from API call is greater than 20,
        // If so cap it at 20
        // If not display that page
        setNumOfPages={setNumOfPages}
        setPage={setPage}
      />
    </>
  );
};

export default Home;
