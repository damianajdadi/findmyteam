import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";
import ResultsList from "./ResultsList";
import OffersForm from "./OffersForm";

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
      results: [
        {
          sport: { _id: 1, name: "Futbol" },
          position: { id: 1, name: "Portero" },
          team: { _id: 1, name: "Isotopos Alirion" }
        }
      ]
    };
  }
  render() {
    return (
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>
          <h2>Buscar Ofertas</h2>
          <OffersForm />
        </div>
        <ResultsList results={this.state.results} />
        <TableFooter />
      </div>
    );
  }
}

export default Search;
