import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div
        style={{
          padding: "10px",
          minWidth: "300px",
          borderStyle: "solid",
          borderColor: "blue",
          borderWidth: "1px 2px 1px 0px"
        }}
      >
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
            <RaisedButton
              label={x.name}
              backgroundColor="#f58c32"
              labelColor="#fff"
              onClick={() => this.props.bubble(x.id)}
              buttonStyle={{ borderRadius: "25px" }}
              style={{ backgroundColor: "#ad9999" }}
            />
            <HighLightOff onClick={() => console.log("call delete ")} />
          </div>
        ))}
      </div>
    );
  }
}
