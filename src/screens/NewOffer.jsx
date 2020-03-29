import React from "react";
import OffersForm from "../components/inputs/OffersForm";
import MenuAppBar from "../components/MenuAppBar";
import TableFooter from "../components/TableFooter";

class NewOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ""
    };
  }

  handleOnChangeNotes = event => this.setState({ notes: event.target.value });

  render() {
    debugger;
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
