import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import MovieModal from "../MovieModal/MovieModal.component";

export default function ActionAreaCard({ title, image, release_date, id }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div onClick={() => setOpenModal(true)}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={"https://image.tmdb.org/t/p/original" + image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {release_date}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      {openModal ? (
        <MovieModal onClose={() => setOpenModal(false)} id={id} />
      ) : null}
    </>
  );
}
