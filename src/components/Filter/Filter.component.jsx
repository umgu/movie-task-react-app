import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import utils from "./Filter.utils";
import CONSTANTS from "./Filter.constants";

export default function Filter({ onSelect }) {
  const [year, setYear] = React.useState("");

  React.useEffect(
    function () {
      onSelect(year);
    },
    [year]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
      }}
    >
      <Box sx={{ width: "25%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Age"
            onChange={(event) => setYear(event.target.value)}
          >
            <MenuItem value={0}>None</MenuItem>
            {utils
              .getYearList(CONSTANTS.START_YEAR, CONSTANTS.LAST_YEAR)
              .map((y) => (
                <MenuItem value={y}>{y}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
