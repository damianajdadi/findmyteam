import React from "react";

class MyOffers extends React.Component {
  _fetchApi = () => {
    fetch(
      "http://localhost:5000/api/offers?user_id=" +
        localStorage.getItem("user_id").replace(/"/g, "")
    )
      .then(response => response.json())
      .catch(console.log);
  };

  handleCreateOffer = () => {
    fetch("http://localhost:5000/api/offers", requestOptions).then(response => {
      response.json();
    });
  };

  componentDidMount() {
    this._fetchApi();
  }
  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
      alert("Acceso denegado. Para poder acceder necesitas identificarte");
    }
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
  }
}

export default MyOffers;
