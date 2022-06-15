import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard.component";
import Box from "@mui/material/Box";
import utils from "./Home.utils";
import Pagination from "@mui/material/Pagination";
import CONSTANTS from "./Home.constants";
import { Bars } from "react-loader-spinner";
import Filter from "../Filter/Filter.component";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [pageDetails, setPageDetails] = useState({ currPage: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterYear, setFilterYear] = useState(0);

  useEffect(function () {
    setIsLoading(true);
    axios
      .get("https://movie-task.vercel.app/api/popular?page=1")
      .then(function (response) {
        setMovies(response.data.data.results);
      })
      .catch(function (reject) {
        setError(true);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  useEffect(
    function () {
      const page = utils.noOfPages(
        moviesToShow.length,
        CONSTANTS.NO_OF_RECORDS_PER_PAGE
      );
      setPageDetails((oldState) => {
        return { ...oldState, noOfPages: page, currPage: 1 };
      });
    },
    [moviesToShow]
  );

  useEffect(
    function () {
      setMoviesToShow([...movies]);
    },
    [movies]
  );

  useEffect(
    function () {
      if (filterYear) {
        setMoviesToShow(
          movies.filter((movie) => {
            return Number(movie.release_date.split("-")[0]) === filterYear;
          })
        );
      } else setMoviesToShow([...movies]);
    },
    [filterYear]
  );

  return isLoading ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Bars
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      />
    </Box>
  ) : error ? (
    <h1>Something went wrong...</h1>
  ) : (
    <>
      <br />
      <Filter onSelect={(value) => setFilterYear(value)} />
      {moviesToShow.length !== 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px"
          }}
        >
          {utils
            .pagesForPage(
              moviesToShow,
              pageDetails.currPage,
              CONSTANTS.NO_OF_RECORDS_PER_PAGE
            )
            .map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  image={movie.poster_path}
                  release_date={movie.release_date}
                  id={movie.id}
                />
              );
            })}
        </Box>
      ) : (
        <h2>No Movies Found!!!</h2>
      )}
      <div
        style={{
          paddingTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Pagination
          count={pageDetails.noOfPages}
          page={pageDetails.currPage}
          onChange={(event, value) => {
            setPageDetails((oldstate) => {
              return { ...oldstate, currPage: value };
            });
          }}
        />
      </div>
    </>
  );
}
