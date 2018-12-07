import React, { Component } from "react";
import { connect } from "react-redux";

class ListView extends Component {
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
        <div>ListView Comp</div>
      </div>
    );
  }
}

export default ListView;
