import React, { Component } from "react";
import { connect } from "react-redux";
import FormContainerGiftEvent from "./Form/FormContainerGiftEvent";

class GiftEvent extends Component {
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
        <div>GiftEventComp</div>
        <FormContainerGiftEvent />
      </div>
    );
  }
}

export default GiftEvent;
