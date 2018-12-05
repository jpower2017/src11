import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import SubNav from "./SubNav";
import ListView from "./ListView";
import GiftEvent from "./GiftEvent";
import Geneology from "./Geneology";
import GiftRequests from "./GiftRequests";
import Summary from "./Summary";

const screens = [
  { id: 1, component: <ListView />, title: "List View title" },
  { id: 2, component: <GiftEvent />, title: "Gift Event title" },
  { id: 3, component: <Geneology />, title: "Geneology title" },
  { id: 4, component: <GiftRequests />, title: "Gift Requests title" },
  { id: 5, component: <Summary />, title: "Summary title" }
];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  componentDidMount() {}
  direction(n) {
    console.log("Main direction n " + n);
    this.setState({ screen: this.state.screen + n });
  }
  getScreen() {
    const screenRow = R.find(x => x.id === this.state.screen, screens);
    console.table(screenRow);
    return R.prop("component", screenRow);
  }

  render() {
    return (
      <div>
        <SubNav
          direction={n => this.direction(n)}
          currentScreen={this.state.screen}
          lastScreen={5}
        />
        <div> MAIN GIFT LOG </div>
        {this.state.screen}
        {this.getScreen()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const Main2 = connect(mapStateToProps)(Main);

export default Main2;
