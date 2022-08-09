import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";
import SingleContent from "../../components/content/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";
import "./search.css";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [movieData, setMovieData] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);

  const fetchSearchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      console.log(data);
      setMovieData(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSearchMovies();
  }, [page]);

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
        {movieData &&
          movieData.map((item) => {
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
