import React from "react";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import IconButton from "@material-ui/core/IconButton";
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

class Applies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applies: []
    };
  }

  _fetchApi = () => {
    let applyArray = [];
    fetch("http://localhost:5000/api/applies")
      .then(response => response.json())
      .then(data => {
        debugger;
        data.applies.map(apply => {
          if (
            apply.player._id === JSON.parse(localStorage.getItem("user"))._id
          ) {
            applyArray.push(apply);
          }
          this.setState({
            applies: applyArray
          });
        });
      })
      .catch(console.log);
    console.log(this.state.applies);
  };

  handleOnDeleteApply = (event, data) => {
    const url = "http://localhost:5000/api/applies/" + data._id;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    };
    fetch(url, requestOptions)
      .then(response => {
        response.json();
        window.location.reload(false);
      })
      .catch(console.log);
  };

  componentDidMount() {
    this._fetchApi();
  }

  render() {
    if (localStorage.getItem("user_id") === null) {
      window.location.href = "/";
    }
    return (
      <div style={styles.main}>
        <h2>Candidaturas</h2>
        <List>
          {this.state.applies.map(result => (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    result.offer.team.name +
                    "\n" +
                    result.offer.position.name +
                    " de " +
                    result.offer.sport.name +
                    " en " +
                    result.offer.city
                  }
                  secondary={result.offer.notes}
                />
                <IconButton
                  id={result._id}
                  aria-label="delete"
                  onClick={event => this.handleOnDeleteApply(event, result)}
                >
                  <ClearSharpIcon fontSize="large" />
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

export default Applies;
