import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";
import OffersForm from "../components/inputs/OffersForm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

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
      results: []
    };
  }

  handleResults = resultsValue => {
    this.setState({ results: resultsValue });
  };

  handleOnClick = (event, data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offer: data,
        user: JSON.parse(localStorage.getItem("user"))
      })
    };
    fetch("http://localhost:5000/api/applies", requestOptions).then(
      response => {
        response.json();
      }
    );
  };

  renderResults = () => {
    let results = this.state.results ? this.state.results : [];
    return (
      <List>
        {results.map(result => (
          <div>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  result.team.name +
                  "\n" +
                  result.position.name +
                  " de " +
                  result.sport.name +
                  " en " +
                  result.city
                }
                secondary={
                  result.notes +
                  " - " +
                  result.team.phone +
                  " - " +
                  result.team.email
                }
              />
              <IconButton
                aria-label="delete"
                onClick={event => this.handleOnClick(event, result)}
              >
                <CheckSharpIcon></CheckSharpIcon>
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    );
  };
  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
      return null;
    }
    if (JSON.parse(localStorage.getItem("user")).type === "team") {
      window.location.href = "/home";
      alert("Acceso denegado.");
      return null;
    }
    return (
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <h2>Buscar Ofertas</h2>
              <OffersForm onDefineResults={this.handleResults} />
            </Grid>
            <Grid item xs={9}>
              {this.renderResults()}
            </Grid>
          </Grid>
        </div>
        <TableFooter />
      </div>
    );
  }
}

export default Search;
