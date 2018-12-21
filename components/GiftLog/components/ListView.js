import React, { Component } from "react";
import { connect } from "react-redux";
import TableGiftEventsContainer from "./TableGiftEventsContainer";

class ListView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <TableGiftEventsContainer
          onNew={() => this.props.onNew()}
          onEdit={() => this.props.onEdit()}
        />
      </div>
    );
  }
}

export default ListView;
