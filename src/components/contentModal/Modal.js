import * as React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

export default function ContentModal({ children, id }) {
  const [open, setOpen] = React.useState(false);
  const [movieData, setMovieData] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchMovieData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
    );

    console.log(movieData);
    setMovieData(data);
  };

  useEffect(() => {
    fetchMovieData();
  }, [open]);

  // console.log(movieData);

  return (
    <div>
      <Button onClick={handleOpen} type="buttom" className="media">
        {children}
      </Button>
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
                className="Content_portrait"
                src={movieData && `${img_300}/${movieData.poster_path}`}
                alt={movieData && movieData.original_title}
              />
              <div className="ContentModal__about">
                <span className="ContentModal_title">
                  {movieData && movieData.origina_title}
                  {movieData && movieData.release_date}
                </span>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
