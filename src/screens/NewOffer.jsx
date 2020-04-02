import React from "react";
import OffersForm from "../components/inputs/OffersForm";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";

class NewOffer extends React.Component {
  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
    }
    return (
      <div>
        <MenuAppBar />
        <h1>Crear Oferta</h1>
        <OffersForm />
        <TableFooter />
      </div>
    );
  }
}

export default NewOffer;
