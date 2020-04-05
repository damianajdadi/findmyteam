import React from "react";
import Applies from "./Applies";
import MyOffers from "./MyOffers";
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

class Home extends React.Component {
  userPlayer = () => {
    return JSON.parse(localStorage.getItem("user")).type === "player";
  };

  homeView = () => {
    if (this.userPlayer()) {
      return (
        <div>
          <Applies />
        </div>
      );
    }
    return (
      <div>
        <MyOffers />
      </div>
    );
  };
  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
      return null;
    }

    return (
      <div style={styles.root}>
        <MenuAppBar />
        <div style={styles.main}>{this.homeView()}</div>
        <TableFooter />
      </div>
    );
  }
}

export default Home;
