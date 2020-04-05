import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TableFooter from "../components/TableFooter";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import SportsSelector from "../components/inputs/SportsSelector";
import PositionsSelector from "../components/inputs/PositionsSelector";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[700]
    },
    secondary: {
      main: red[500]
    }
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      name: "",
      surname: "",
      phone: "",
      selectedSport: "",
      selectedPosition: "",
      dominantLeg: "",
      age: "",
      experience: "",
      city: "",
      availableSports: [],
      availablePositions: []
    };
  }

  handleOnChangePassword = event =>
    this.setState({ password: event.target.value });

  handleOnChangeName = event => this.setState({ name: event.target.value });

  handleOnChangeSurname = event =>
    this.setState({ surname: event.target.value });

  handleOnChangePhone = event => this.setState({ phone: event.target.value });

  handleOnChangeDominantLeg = event =>
    this.setState({ dominantLeg: event.target.value });

  handleOnChangeAge = event => this.setState({ age: event.target.value });

  handleOnChangeCity = event => this.setState({ city: event.target.value });

  handleOnChangeExperience = event =>
    this.setState({ experience: event.target.value });

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

  handleOnSubmit = () => {
    const url =
      "http://localhost:5000/api/users/" +
      localStorage.getItem("user_id").replace(/"/g, "");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname,
        phone: this.state.phone,
        sport: this.state.selectedSport,
        position: this.state.selectedPosition,
        dominantLeg: this.state.dominantLeg,
        age: this.state.age,
        experience: this.state.experience,
        city: this.state.city
      })
    };
    fetch(url, requestOptions)
      .then(response => {
        response.json();
      })
      .catch(console.log);
  };

  handleOnDelete = () => {
    const url =
      "http://localhost:5000/api/users/" +
      localStorage.getItem("user_id").replace(/"/g, "");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    };
    fetch(url, requestOptions)
      .then(response => {
        localStorage.clear();
        alert("Usuario eliminado");
        window.location.href = "/";
        response.json();
      })
      .catch(console.log);
  };

  userPlayer = () => {
    return JSON.parse(localStorage.getItem("user")).type === "player";
  };

  userTeam = () => {
    return JSON.parse(localStorage.getItem("user")).type === "team";
  };

  playerView = () => {
    if (this.userPlayer()) {
      return (
        <div>
          <TextField
            required
            value={this.state.name}
            id="outlined-required"
            label={"Nombre"}
            variant="outlined"
            onChange={this.handleOnChangeName}
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Apellido"
            variant="outlined"
            onChange={this.handleOnChangeSurname}
          />
          <br />
          <TextField
            type="password"
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <TextField
            required
            value={this.state.phone}
            id="outlined-required"
            label="Teléfono"
            variant="outlined"
            onChange={this.handleOnChangePhone}
          />
          <br />
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
          <br />
          <FormControl
            required
            variant="outlined"
            className={useStyles.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Pierna Dominante
            </InputLabel>
            <Select
              labelId="dominantLeg-label"
              id="dominantLeg"
              value={this.state.dominantLeg}
              onChange={this.handleOnChangeDominantLeg}
            >
              <MenuItem value={"right-handed"}>Diestro</MenuItem>
              <MenuItem value={"left-handed"}>Zurdo</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            value={this.state.age}
            id="outlined-basic"
            label="Edad"
            variant="outlined"
            onChange={this.handleOnChangeAge}
          />
          <br />
          <TextField
            required
            value={this.state.city}
            id="outlined-required"
            label="Ciudad"
            variant="outlined"
            onChange={this.handleOnChangeCity}
          />
          <br />
          <TextField
            value={this.state.experience}
            id="outlined-multiline-static"
            label="Experiencia"
            multiline
            rows="4"
            defaultValue="Default Value"
            variant="outlined"
            onChange={this.handleOnChangeExperience}
          />
          <br />
        </div>
      );
    }
    return null;
  };

  teamView = () => {
    if (this.userTeam()) {
      return (
        <div>
          <TextField
            required
            value={this.state.name}
            id="outlined-required"
            label={"Nombre"}
            variant="outlined"
            onChange={this.handleOnChangeName}
          />
          <br />
          <TextField
            type="password"
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <TextField
            required
            value={this.state.phone}
            id="outlined-required"
            label="Teléfono"
            variant="outlined"
            onChange={this.handleOnChangePhone}
          />
          <br />
          <SportsSelector
            value={this.state.selectedSport._id}
            sports={this.state.availableSports}
            handleOnChangeSport={this.handleOnChangeSport}
          />
          <br />
          <TextField
            required
            value={this.state.city}
            id="outlined-required"
            label="Ciudad"
            variant="outlined"
            onChange={this.handleOnChangeCity}
          />
          <br />
          <TextField
            value={this.state.experience}
            id="outlined-multiline-static"
            label="Experiencia"
            multiline
            rows="4"
            defaultValue="Default Value"
            variant="outlined"
            onChange={this.handleOnChangeExperience}
          />
        </div>
      );
    }
    return null;
  };

  componentDidMount() {
    this._fetchApi();
  }

  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
      return null;
    }
    return (
      <div>
        <ThemeProvider theme={theme}>
          <MenuAppBar />
          <h1>Mi Perfil</h1>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            {this.playerView()}
            {this.teamView()}
            <Button
              label="Submit"
              onClick={this.handleOnSubmit}
              variant="contained"
              color="Primary"
            >
              EDITAR PERFIL
            </Button>
            <br />
            <Button
              label="Submit"
              onClick={this.handleOnDelete}
              variant="contained"
              color="secondary"
            >
              Eliminar Perfil
            </Button>
          </Grid>
          <TableFooter />
        </ThemeProvider>
      </div>
    );
  }
}

export default Profile;
