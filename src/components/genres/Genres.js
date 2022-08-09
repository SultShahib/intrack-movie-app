import * as React from "react";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { API_KEY } from "../../pages/home/Home";
import { useEffect } from "react";

// Renders the genres in movie page
// Genres is a stateless component, receives props from Home component

function Genres({
  genres,
  setGenre,
  setSelectedGenre,
  selectedGenre,
  setPage,
}) {
  // Receives 2 arrays, setGenre and setSelectedGenre
  // setGenre is all the genres availible from API call
  // selectedGenre is the genres users select

  const fetchGenres = async (API_KEY) => {
    // Fetches the list of availible genres
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

    // useEffect has a return statement to clear up the setGenre useState method
    // To avoid duplicates
    // WIll be called when user selects genre

    // eslint-disable-next-line
  }, [setSelectedGenre]);

  // handleRemove will remove the genre user will delete the genre from the selectedgenre Array
  // Will be added to the setGenre array
  const handleRemove = (genre) => {
    setGenre([...genres, genre]);
    setPage(1);
    setSelectedGenre(selectedGenre.filter((item) => item.id !== genre.id));
  };

  // handleAdd will remove the array user picks in the setGenre array.
  // That genre will be added to the selectedGenre array
  const handleAdd = (genre) => {
    setSelectedGenre([...selectedGenre, genre]);
    setGenre(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

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
      {/* Renders the selectedGenre if availible */}
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

      {/* Renders the setGenre (availible by default) */}
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
