import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TableFooter from "../components/TableFooter";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      sport: "",
      position: "",
      dominantLeg: "",
      age: "",
      height: "",
      weight: "",
      city: "",
      experience: ""
    };
  }

  handleOnChangeName = event => this.setState({ name: event.target.value });

  handleOnChangeSurname = event =>
    this.setState({ surname: event.target.value });

  handleOnChangePhone = event => this.setState({ phone: event.target.value });

  handleOnChangeSport = event => this.setState({ sport: event.target.value });

  handleOnChangePosition = event =>
    this.setState({ position: event.target.value });

  handleOnChangeDominantLeg = event =>
    this.setState({ dominantLeg: event.target.value });

  handleOnChangeAge = event => this.setState({ age: event.target.value });

  handleOnChangeHeight = event => this.setState({ height: event.target.value });

  handleOnChangeWeight = event => this.setState({ weight: event.target.value });

  handleOnChangeCity = event => this.setState({ city: event.target.value });

  handleOnChangeExperience = event =>
    this.setState({ experience: event.target.value });

  render() {
    return (
      <div>
        <MenuAppBar />
        <h1>Mi Perfil</h1>
        <Avatar
          alt="Damian Ajdadi"
          src="/static/images/avatar/1.jpg"
          className={useStyles.large}
        />
        <br />
        <form noValidate autoComplete="off">
          <TextField
            value={this.state.name}
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            onChange={this.handleOnChangeName}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Apellido"
            variant="outlined"
            onChange={this.handleOnChangeSurname}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(event, newValue) => this.setState({ email: newValue })}
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
            value={this.state.phone}
            id="outlined-basic"
            label="Teléfono"
            variant="outlined"
            onChange={this.handleOnChangePhone}
          />
          <br />
        </form>
        <FormControl variant="outlined" className={useStyles.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Deporte
          </InputLabel>
          <Select
            labelId="sport-label"
            id="sport"
            value={this.state.sport}
            onChange={this.handleOnChangeSport}
          >
            <MenuItem value={"football"}>Fútbol</MenuItem>
            <MenuItem value={"futsal"}>Fútbol Sala</MenuItem>
            <MenuItem value={"handball"}>Balonmano</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl variant="outlined" className={useStyles.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Posición
          </InputLabel>
          <Select
            labelId="position-label"
            id="position"
            value={this.state.position}
            onChange={this.handleOnChangePosition}
          >
            <MenuItem value={"striker"}>Delantero</MenuItem>
            <MenuItem value={"defender"}>Defensa</MenuItem>
            <MenuItem value={"goalkeeper"}>Portero</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl variant="outlined" className={useStyles.formControl}>
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
        <form noValidate autoComplete="off">
          <TextField
            value={this.state.age}
            id="outlined-basic"
            label="Edad"
            variant="outlined"
            onChange={this.handleOnChangeAge}
          />
          <br />
          <TextField
            value={this.state.height}
            id="outlined-basic"
            label="Altura"
            variant="outlined"
            onChange={this.handleOnChangeHeight}
          />
          <br />
          <TextField
            value={this.state.weight}
            id="outlined-basic"
            label="Peso"
            variant="outlined"
            onChange={this.handleOnChangeWeight}
          />
          <br />
          <TextField
            value={this.state.city}
            id="outlined-basic"
            label="Ciudad"
            variant="outlined"
            onChange={this.handleOnChangeCity}
          />
          <br />
          <TextField
            value={this.state.experience}
            id="outlined-basic"
            label="Experiencia"
            variant="outlined"
            onChange={this.handleOnChangeExperience}
          />
        </form>
        <br />
        <Button label="Submit" variant="contained" color="primary">
          Editar Perfil
        </Button>
        <TableFooter />
      </div>
    );
  }
}

export default Profile;
