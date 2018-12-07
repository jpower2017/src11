import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";

export default class RequestGeneologyList extends Component {
  constructor(props) {
    super(props);
  }
  /*
  showRow = (x, i) => {
    return (
      <div style={{ paddingLeft: "4px", paddingRight: "4px" }}>{x.name}</div>
    );
  };
  */
  render() {
    const { data } = this.props;
    return (
      <div style={{ padding: "10px", minWidth: "300px" }}>
        <div style={{ fontWeight: "bold" }}>{this.props.title}</div>
        {data.map((x, i) => (
          <div
            key={i}
            style={{
              padding: "20px",
              margin: "10px",
              backgroundColor: "#ad9999"
            }}
          >
            {x.name}
            _____ ({x.relation})
          </div>
        ))}
      </div>
    );
  }
}
