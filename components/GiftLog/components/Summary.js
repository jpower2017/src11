import React, { Component } from "react";
import { connect } from "react-redux";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <div>SummaryComp</div>
      </div>
    );
  }
}

export default Summary;
