import React from "react";
import SportsSelector from "./SportsSelector";
import PositionsSelector from "./PositionsSelector";
import TextField from "@material-ui/core/TextField";

class OffersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSport: null,
      selectedPosition: null,
      availableSports: [],
      availablePositions: [],
      notes: "",
      city: "",
      category: "",
      search: "",
      results: []
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

  handleOnChangeName = event => this.setState({ name: event.target.value });

  handleOnChangeCity = event => this.setState({ city: event.target.value });

  handleOnChangeNotes = event => this.setState({ notes: event.target.value });

  handleOnChangeCategory = event =>
    this.setState({ category: event.target.value });

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

  handleSubmit = event => {
    if (window.location.pathname === "/offers/new") {
      this.handleCreateOffer();
    }
  };

  handleCreateOffer = () => {
    debugger;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team_id: localStorage.getItem("user_id"),
        sport_id: this.state.selectedSport,
        position_id: this.state.selectedPosition,
        city: this.state.city,
        category: this.state.category,
        notes: this.state.notes
      })
    };
    fetch("http://localhost:5000/api/offers", requestOptions).then(response => {
      response.json();
    });
  };

  handleSearchOffer = () => {};

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
      </div>
    );
  }
  renderNotes = () => {
    if (window.location.pathname === "/offers/new") {
      return (
        <TextField
          value={this.state.notes}
          id="outlined-basic"
          label="Notas"
          variant="outlined"
          onChange={this.handleOnChangeNotes}
        />
      );
    }
    return null;
  };
  render() {
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          {this.renderSelectors()}
          <TextField
            value={this.state.city}
            id="outlined-basic"
            label="Ciudad"
            variant="outlined"
            onChange={this.handleOnChangeCity}
          />
          <br />
          <TextField
            value={this.state.category}
            id="outlined-basic"
            label="Categoria"
            variant="outlined"
            onChange={this.handleOnChangeCategory}
          />
          <br />
          {this.renderNotes()}
          <br />
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default OffersForm;
