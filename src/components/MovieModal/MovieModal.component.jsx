import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "75%",
  height: "75%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function MovieModal({ onClose, id }) {
  const [movieDetail, setMovieDetails] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(function () {
    axios
      .get("https://movie-task.vercel.app/api/movie?movieId=" + id)
      .then(function (response) {
        setMovieDetails(response.data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? null : (
        <div>
          <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CardMedia
                component="img"
                height="50%"
                image={
                  "https://image.tmdb.org/t/p/original" +
                  movieDetail.data.poster_path
                }
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movieDetail.data.original_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movieDetail.data.overview}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                  {movieDetail.data.release_date}
                </Typography>
              </CardContent>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
