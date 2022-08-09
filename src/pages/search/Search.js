import { useEffect, useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SingleContent from "../../components/content/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";
import "./search.css";

// Search component renders movies based on user searches

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [movieData, setMovieData] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);

  // fetchSearchMovies makes API GET request for movies based on user searches

  const fetchSearchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setMovieData(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to call fetchSearchMovies()
  // Will be called if page number (if exist) changes
  useEffect(() => {
    fetchSearchMovies();
  }, [searchText]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="standard-basic"
          label="Search"
          variant="filled"
          className="searchBox"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 10 }}
          onClick={fetchSearchMovies}
        >
          <SendIcon />
        </Button>
      </div>

      <div className="movies">
        {/* If movieData exists then render the SingleComponent with movieData details */}
        {movieData &&
          movieData.map((item) => {
            return (
              <SingleContent
                key={item.id}
                item={item}
                id={item.id}
                title={item.original_title}
                date={item.release_date}
                poster={item.poster_path}
              />
            );
          })}
      </div>

      {/* Checks to see if movieData exists and if the numOfPages is greater than 1 */}
      {/* If both conditions are true, render the custom pagination */}
      {movieData && numOfPages > 1 && (
        <CustomPagination
          numOfPages={numOfPages > 20 ? 20 : numOfPages}
          setNumOfPages={setNumOfPages}
          setPage={setPage}
        />
      )}
    </>
  );
}
