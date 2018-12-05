import React, { Component } from "react";
import { connect } from "react-redux";
import Back from "material-ui/svg-icons/navigation/arrow-back";
import Forward from "material-ui/svg-icons/navigation/arrow-forward";

class SubNav extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  componentDidMount() {}

  render() {
    const { currentScreen, lastScreen } = this.props;
    return (
      <div style={{ display: "flex" }}>
        {currentScreen > 1 && <Back onClick={() => this.props.direction(-1)} />}
        {currentScreen + 1 <= lastScreen && (
          <Forward onClick={() => this.props.direction(1)} />
        )}
      </div>
    );
  }
}

export default SubNav;
