import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleOnChangeEmail = event => this.setState({ email: event.target.value });

  handleOnChangePassword = event =>
    this.setState({ password: event.target.value });

  validationRules = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleSubmit = event => {
    const urlApi = "http://localhost:5000/api/users/login";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };
    fetch(urlApi, opts)
      .then(function(response) {
        console.log("POST SUCCESS");
        return response.json();
      })
      .then(function(response) {
        if (response.success === "true") {
          localStorage.setItem("user_id", JSON.stringify(response.user[0]._id));
          localStorage.setItem("user", JSON.stringify(response.user[0]));
          window.location.href = "/profile";
        } else {
          alert("Usuario no encontrado");
        }
      });
    event.preventDefault();
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
          <h1>FindMyTeam</h1>
          <TextField
            value={this.state.email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={this.handleOnChangeEmail}
          />
          <br />
          <TextField
            value={this.state.password}
            type="password"
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            onChange={this.handleOnChangePassword}
          />
          <br />
          <Button
            label="Submit"
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            disabled={!this.validationRules()}
          >
            Acceder
          </Button>
          <br />
          <Link to="/signup">¿Aún no eres miembro? ¡Regístrate ya!</Link>
        </Grid>
      </div>
    );
  }
}
export default Login;
