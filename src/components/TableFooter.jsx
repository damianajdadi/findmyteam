import React from "react";
import Divider from "@material-ui/core/Divider";

class TableFooter extends React.Component {
  render() {
    return (
      <div>
        <Divider variant="inset" component="p" />
        <p>Created by: Damián Ajdadi</p>
        <p>
          Contact information:{" "}
          <a href="mailto:damian.ajdadi@gmail.com">damian.ajdadi@gmail.com</a>.
        </p>
      </div>
    );
  }
}

export default TableFooter;
