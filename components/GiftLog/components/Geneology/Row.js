import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import CircleAdd from "material-ui/svg-icons/image/control-point";

export default class Row extends Component {
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
              margin: "2px",
              backgroundColor: "#ad9999",
              display: "flex"
            }}
          >
            <div>{x.name}</div>
            <div onClick={() => this.props.onsearch("main", x)}>
              <CircleAdd />
              Add as main
            </div>
            <div onClick={() => this.props.onsearch("parents", x)}>
              <CircleAdd />
              Add as parent
            </div>
            <div onClick={() => this.props.onsearch("partners", x)}>
              <CircleAdd />
              Add as partner
            </div>
            <div onClick={() => this.props.onsearch("children", x)}>
              <CircleAdd />
              Add as kid
            </div>
            <div onClick={() => this.props.onsearch("siblings", x)}>
              <CircleAdd />
              Add as sibling
            </div>
          </div>
        ))}
      </div>
    );
  }
}
