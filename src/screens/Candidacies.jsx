import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";

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

class Candidacies extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>
          <h2>Candidaturas</h2>
        </div>
        <TableFooter />
      </div>
    );
  }
}

export default Candidacies;
