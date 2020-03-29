import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";
import OffersForm from "../components/inputs/OffersForm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

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

  renderResults = () => {
    let results = this.state.results ? this.state.results : [];
    return (
      <List>
        {results.map(result => (
          <div>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  "Equipo de " +
                  result.sport.name +
                  " en " +
                  result.city +
                  " busca " +
                  result.position.name
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    );
  };
  render() {
    return (
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>
          <h2>Buscar Ofertas</h2>
          <OffersForm onDefineResults={this.handleResults} />
        </div>
        {this.renderResults()}
        <TableFooter />
      </div>
    );
  }
}

export default Search;
