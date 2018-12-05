import React, { Component } from "react";
import { connect } from "react-redux";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  componentDidMount() {}

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div>ListView Comp</div>
      </div>
    );
  }
}

export default ListView;
