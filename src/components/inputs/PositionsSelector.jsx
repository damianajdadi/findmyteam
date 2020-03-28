import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const PositionsSelector = props => {
  const { value, positions, handleOnChangePosition } = props;
  const renderPositions = () =>
    positions.map(position => (
      <MenuItem key={position._id} value={position._id}>
        {position.name}
      </MenuItem>
    ));
  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Posición</InputLabel>
      <Select
        labelId="position-label"
        id="position"
        value={value}
        onChange={handleOnChangePosition}
      >
        {renderPositions()}
      </Select>
    </FormControl>
  );
};

export default PositionsSelector;
