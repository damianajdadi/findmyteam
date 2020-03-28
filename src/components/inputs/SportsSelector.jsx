import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SportsSelector = props => {
  const { value, sports, handleOnChangeSport } = props;
  const renderSports = () =>
    sports.map(sport => (
      <MenuItem key={sport._id} value={sport._id}>
        {sport.name}
      </MenuItem>
    ));

  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Deporte</InputLabel>
      <Select
        labelId="sport-label"
        id="sport"
        value={value}
        onChange={handleOnChangeSport}
      >
        {renderSports()}
      </Select>
    </FormControl>
  );
};

export default SportsSelector;
