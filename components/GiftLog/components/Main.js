import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import SubNav from "./SubNav";
import ListView from "./ListView";
import GiftEvent from "./GiftEvent";
import GeneologyContainer from "./GeneologyContainer";
import GiftRequests from "./GiftRequests";
import SummaryContainer from "./Form/SummaryContainer";
import { setVar } from "../actions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
      screens: [
        {
          id: 1,
          component: (
            <ListView
              title="List screen"
              onNew={() => this.setState({ screen: 2 })}
              onEdit={() => this.setState({ screen: 2 })}
            />
          )
        },
        { id: 2, component: <GiftEvent title="Gift Event screen" /> },
        { id: 3, component: <GeneologyContainer title="Geneology screen" /> },
        {
          id: 4,
          component: <GiftRequests title="Gift Requests screen" />
        },
        {
          id: 5,
          component: (
            <SummaryContainer
              title="Summary screen"
              onDone={() => this.setState({ screen: 1 })}
              onEdit={() => this.setState({ screen: 2 })}
              onAddRequest={() => this.addRequest()}
            />
          )
        }
      ]
    };
  }
  componentDidMount() {}

  addRequest = () => {
    console.log("Main addRequest");
    this.props.setVar();
    this.setState({ screen: 4 });
  };

  onNew = () => {
    this.setState({ screen: 2 });
  };

  direction(n) {
    this.setState({ screen: this.state.screen + n });
  }
  getScreen() {
    const screenRow = R.find(
      x => x.id === this.state.screen,
      this.state.screens
    );
    console.table(screenRow);
    return R.prop("component", screenRow);
  }
  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "#6076A9",
            width: "1200px",
            color: "#fff",
            padding: "10px"
          }}
        >
          GIFT LOG
        </div>
        <SubNav
          direction={n => this.direction(n)}
          currentScreen={this.state.screen}
          lastScreen={5}
        />
        {this.getScreen()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setVar: () => {
    console.log("Main setVar");
    dispatch(setVar("currentGiftRequest", ""));
  }
});

const Main2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default Main2;
