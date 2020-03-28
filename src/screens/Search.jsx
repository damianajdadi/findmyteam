import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";
import SportsSelector from "../components/inputs/SportsSelector";
import PositionsSelector from "../components/inputs/PositionsSelector";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ResultsList from "./ResultsList";

const styles = {
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    height: "100%"
  },
  main: {
    flex: 1
  }
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selectedSport: null,
      selectedPosition: null,
      results: [
        {
          sport: { _id: 1, name: "Futbol" },
          position: { id: 1, name: "Portero" },
          team: { _id: 1, name: "Isotopos Alirion" }
        }
      ],
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
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>
          <h2>Buscar Ofertas</h2>
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
        <ResultsList results={this.state.results} />
        <TableFooter />
      </div>
    );
  }
}

export default Search;
