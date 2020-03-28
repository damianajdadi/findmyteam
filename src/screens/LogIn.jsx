import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

  handleSubmit = event => event.preventDefault();

  render() {
    return (
      <div>
        <h1>FindMyTeam</h1>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
        </form>
        <Button
          label="Submit"
          disabled={!this.validationRules()}
          variant="contained"
          color="primary"
        >
          LOGIN
        </Button>
        <br />
        <Link to="/signup">¿Aún no eres miembro? ¡Regístrate ya!</Link>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Login;
