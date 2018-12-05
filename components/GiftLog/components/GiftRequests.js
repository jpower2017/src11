import React, { Component } from "react";
import { connect } from "react-redux";

class GiftRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  componentDidMount() {}

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div>GiftRequestsComp</div>
      </div>
    );
  }
}

export default GiftRequests;
