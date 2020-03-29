import React from "react";
import SportsSelector from "../components/inputs/SportsSelector";
import PositionsSelector from "../components/inputs/PositionsSelector";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class OffersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSport: null,
      selectedPosition: null,
      availableSports: [],
      availablePositions: [],
      city: ""
    };
  }

  definePositions = id => {
    let positionArr;
    this.state.availableSports.map(function(sport) {
      if (sport._id === id) {
        positionArr = sport.positions;
      }
    });
    this.setState({
      availablePositions: positionArr
    });
  };

  handleOnChangeSport = event => {
    this.setState({ selectedSport: event.target.value });
    this.definePositions(event.target.value);
  };

  handleOnChangePosition = event =>
    this.setState({ selectedPosition: event.target.value });

  handleOnChangeCity = event => this.setState({ city: event.target.value });

  _fetchApi = () => {
    fetch("http://localhost:5000/api/sports")
      .then(response => response.json())
      .then(data =>
        this.setState({
          availableSports: data.sports
        })
      )
      .catch(console.log);
  };

  componentDidMount() {
    this._fetchApi();
  }

  renderSelectors() {
    return (
      <div>
        <SportsSelector
          value={this.state.selectedSport}
          sports={this.state.availableSports}
          handleOnChangeSport={this.handleOnChangeSport}
        />
        <br />
        <PositionsSelector
          value={this.state.selectedPosition}
          positions={this.state.availablePositions}
          handleOnChangePosition={this.handleOnChangePosition}
        />
        <br />
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderSelectors()}
        <TextField
          value={this.state.city}
          type="text"
          id="outlined-basic"
          label="Ciudad"
          variant="outlined"
          onChange={this.handleOnChangeCity}
        />
        <br />

        <Button label="Submit" variant="contained" color="primary">
          Buscar
        </Button>
      </div>
    );
  }
}

export default OffersForm;
