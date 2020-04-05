import React from "react";
import SportsSelector from "./SportsSelector";
import PositionsSelector from "./PositionsSelector";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class OffersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSport: "",
      selectedPosition: "",
      availableSports: [],
      availablePositions: [],
      notes: "",
      city: "",
      search: "",
      resultsValue: []
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

  handleOnChangeSport = (event, data) => {
    this.setState({ selectedSport: data.props.object });
    this.definePositions(event.target.value);
  };

  handleOnChangePosition = (event, data) => {
    this.setState({ selectedPosition: data.props.object });
  };

  handleOnChangeName = event => this.setState({ name: event.target.value });

  handleOnChangeCity = event => this.setState({ city: event.target.value });

  handleOnChangeNotes = event => this.setState({ notes: event.target.value });

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
    } else {
      this.handleSearchOffer(event);
    }
  };

  handleCreateOffer = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team_id: localStorage.getItem("user_id").replace(/"/g, ""),
        sport: this.state.selectedSport,
        position: this.state.selectedPosition,
        city: this.state.city,
        notes: this.state.notes
      })
    };
    fetch("http://localhost:5000/api/offers", requestOptions).then(response => {
      response.json();
      window.location.href = "/offers";
    });
  };

  handleSearchOffer = event => {
    const urlApi = "http://localhost:5000/api/offers/search";
    const body = {};
    if (this.state.selectedSport._id.length > 0) {
      body["sport"] = this.state.selectedSport;
    }
    if (this.state.selectedPosition._id.length > 0) {
      body["position"] = this.state.selectedPosition;
    }
    if (this.state.city.length > 0) {
      body["city"] = this.state.city;
    }
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    };
    fetch(urlApi, opts)
      .then(function(response) {
        console.log("POST SUCCESS");
        return response.json();
      })
      .then(data => {
        this.props.onDefineResults(data.offer);
      });
    event.preventDefault();
  };

  componentDidMount() {
    this._fetchApi();
  }

  renderSelectors() {
    return (
      <div>
        <SportsSelector
          value={this.state.selectedSport._id}
          sports={this.state.availableSports}
          handleOnChangeSport={this.handleOnChangeSport}
        />
        <br />
        <PositionsSelector
          value={this.state.selectedPosition._id}
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
          id="outlined-multiline-static"
          label="Información adicional"
          multiline
          rows="4"
          defaultValue="Default Value"
          variant="outlined"
          onChange={this.handleOnChangeNotes}
        />
      );
    }
    return null;
  };

  textButton = () => {
    if (window.location.pathname === "/offers/search") {
      return "BUSCAR";
    }
    return "CREAR OFERTA";
  };

  render() {
    return (
      <div>
        {this.renderSelectors()}
        <TextField
          value={this.state.city}
          id="outlined-basic"
          label="Ciudad"
          variant="outlined"
          onChange={this.handleOnChangeCity}
        />
        <br />
        {this.renderNotes()}
        <br />
        <Button
          label="Submit"
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          {this.textButton()}
        </Button>
      </div>
    );
  }
}

export default OffersForm;
