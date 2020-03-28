import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const ResultsList = props => {
  const { results } = props;
  const renderResults = () =>
    results.map(result => (
      <div>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={result.team.name}
            secondary={result.position.name + ", " + result.sport.name}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    ));
  return <List>{renderResults()}</List>;
};

export default ResultsList;
