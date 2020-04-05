import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//INCOMPLETOOOOOOO NO MANDAAAAR NOOOOOO

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  typeSelector: {
    paddingRight: "14px",
    width: "167px"
  }
}));

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: ""
    };
  }

  handleOnChangeEmail = event => this.setState({ email: event.target.value });

  handleOnChangePassword = event =>
    this.setState({ password: event.target.value });

  handleOnChangeType = event => this.setState({ type: event.target.value });

  handleOnSubmit = event => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        type: this.state.type
      })
    };
    fetch("http://localhost:5000/api/users", requestOptions).then(response => {
      alert("Usuario creado");
      window.location.href = "/";
      response.json();
    });
  };

  render() {
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <h1>REGISTRO INCOMPLETO</h1>
          <TextField
            value={this.state.email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={this.handleOnChangeEmail}
          />
          <br />
          <TextField
            type="password"
            value={this.state.password}
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            onChange={this.handleOnChangePassword}
          />
          <br />
          <FormControl variant="outlined" className={useStyles.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Perfil
            </InputLabel>
            <Select
              className="typeSelector"
              labelId="type"
              id="type"
              value={this.state.type}
              onChange={this.handleOnChangeType}
            >
              <MenuItem value={"player"}>Jugador</MenuItem>
              <MenuItem value={"team"}>Club</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Button
            label="Submit"
            onClick={this.handleOnSubmit}
            variant="contained"
            color="secondary"
          >
            Registrarse
          </Button>
        </Grid>
      </div>
    );
  }
}
export default SignUp;
