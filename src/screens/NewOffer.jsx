import React from "react";
import OffersForm from "../components/inputs/OffersForm";
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

class NewOffer extends React.Component {
  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
      return null;
    }
    if (JSON.parse(localStorage.getItem("user")).type === "player") {
      window.location.href = "/home";
      alert("Acceso denegado.");
      return null;
    }
    return (
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>
          <h1>Crear Oferta</h1>
          <OffersForm />
        </div>
        <TableFooter />
      </div>
    );
  }
}

export default NewOffer;
