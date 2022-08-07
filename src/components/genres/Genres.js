import * as React from "react";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { API_KEY } from "../../pages/home/Home";
import { useEffect } from "react";

function Genres({
  genres,
  setGenre,
  setSelectedGenre,
  selectedGenre,
  setPage,
}) {
  const fetchGenres = async (API_KEY) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    setGenre(data.genres);
  };

  useEffect(() => {
    fetchGenres(API_KEY);

    return () => {
      setGenre({});
    };

    // eslint-disable-next-line
  }, [setSelectedGenre]);

  const handleRemove = (genre) => {
    setGenre([...genres, genre]);
    setPage(1);
    setSelectedGenre(selectedGenre.filter((item) => item.id !== genre.id));
  };

  const handleAdd = (genre) => {
    setSelectedGenre([...selectedGenre, genre]);
    setGenre(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  // console.log(genres);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        padding: 30,
        alignItems: "center",
      }}
    >
      {selectedGenre.length > 0 &&
        selectedGenre.map((item) => {
          return (
            item && (
              <Chip
                label={item.name}
                variant="Clickable Deletable"
                key={item.id}
                onDelete={() => handleRemove(item)}
              />
            )
          );
        })}
      {genres.length > 0 &&
        genres.map((item) => {
          return (
            <Chip
              label={item.name}
              variant="outlined"
              key={item.id}
              onClick={(e) => handleAdd(item)}
            />
          );
        })}
    </div>
  );
}

export default Genres;
