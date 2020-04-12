import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    height: "100%",
  },
  main: {
    flex: 1,
  },
};

class MyOffers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
    };
  }

  _fetchApi = () => {
    let offerArray = [];
    fetch("http://localhost:5000/api/offers")
      .then((response) => response.json())
      .then((data) => {
        data.offers.map((offer) => {
          if (
            offer.team._id === localStorage.getItem("user_id").replace(/"/g, "")
          ) {
            offerArray.push(offer);
          }
          this.setState({
            offers: offerArray,
          });
        });
      })
      .catch(console.log);
  };

  handleOnDeleteOffer = (e) => {
    const urlOffers = "http://localhost:5000/api/offers/" + e.currentTarget.id;
    const urlApplies =
      "http://localhost:5000/api/applies?offer_id=" + e.currentTarget.id;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(urlOffers, requestOptions)
      .then((response) => {
        response.json();
        window.location.reload(false);
      })
      .catch(console.log);
    fetch(urlApplies)
      .then((response) => response.json())
      .then((data) => {
        data.applies.map((apply) => {
          const url = "http://localhost:5000/api/applies/" + apply._id;
          fetch(url, requestOptions)
            .then((response) => {
              response.json();
            })
            .catch(console.log);
        });
      })
      .catch(console.log);
  };

  componentDidMount() {
    this._fetchApi();
  }
  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
      return null;
    }
    return (
      <div style={styles.main}>
        <h1>Mis Ofertas</h1>
        <List>
          {this.state.offers.map((result) => (
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
                  secondary={result.notes + " - " + " - " + result.team.email}
                />
                <IconButton
                  id={result._id}
                  aria-label="delete"
                  onClick={this.handleOnDeleteOffer}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default MyOffers;
