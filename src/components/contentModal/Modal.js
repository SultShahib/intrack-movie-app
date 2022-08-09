import * as React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import "./modal.css";
import axios from "axios";
import { img_300 } from "../../config/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ContentModal displays the enlarged version of content.
// Displays the movie poster, date, description and runtime

export default function ContentModal({ children, id }) {
  //  Clicking on the SingleContent will render the ContentModal by setting  handleOpen to true

  const [open, setOpen] = React.useState(false);
  const [movieData, setMovieData] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetchMovieData makes API call that uses the specific ID of the movie you clicked on.
  // It is stored in the movieData state (setMovieData)

  const fetchMovieData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
    );

    console.log(movieData);
    setMovieData(data);
  };

  // UseEffect to call the fetchMovieData.
  // It is called everytime the open state changes (when user clicks on the button)

  useEffect(() => {
    fetchMovieData();
  }, [open]);

  return (
    <div>
      {/* Button element from has children as its value */}
      {/* This children as its child element is the SingleContent component */}

      <Button onClick={handleOpen} type="buttom" className="media">
        {children}
      </Button>

      {/* Modal is the surrounding of the card. Clicking on the surrounding closes the modal card viewe */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="ContentModal">
              <img
                className="ContentModal__landscape"
                src={movieData && `${img_300}/${movieData.poster_path}`}
                alt={movieData && movieData.original_title}
              />
              <div className="ContentModal__about">
                <span className="ContentModal_title">
                  Release Date: {movieData && movieData.release_date}
                </span>
                <span className="ContentModal_title">
                  Run Time: {movieData && movieData.runtime} mins
                </span>
                <span className="ContentModal__title">
                  {movieData && movieData.original_title}
                </span>
                <span className="ContentModal__description">
                  {movieData && movieData.overview}
                </span>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
