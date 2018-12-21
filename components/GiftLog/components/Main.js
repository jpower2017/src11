import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import SubNav from "./SubNav";
import ListView from "./ListView";
import GiftEvent from "./GiftEvent";
import GeneologyContainer from "./GeneologyContainer";
import GiftRequests from "./GiftRequests";
import SummaryContainer from "./Form/SummaryContainer";

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
              title="List of gift events"
              onNew={() => this.setState({ screen: 2 })}
              onEdit={() => this.setState({ screen: 2 })}
            />
          )
        },
        { id: 2, component: <GiftEvent title="Gift Event title" /> },
        { id: 3, component: <GeneologyContainer title="Geneology title" /> },
        {
          id: 4,
          component: <GiftRequests title="Gift Requests title" />
        },
        {
          id: 5,
          component: (
            <SummaryContainer
              title="Summary title"
              onDone={() => this.setState({ screen: 1 })}
              onEdit={() => this.setState({ screen: 2 })}
              onAddRequest={() => this.setState({ screen: 4 })}
            />
          )
        }
      ]
    };
  }
  componentDidMount() {}

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
        <SubNav
          direction={n => this.direction(n)}
          currentScreen={this.state.screen}
          lastScreen={5}
        />
        <div style={{ backgroundColor: "#998877", width: "900px" }}>
          MAIN GIFT LOG
        </div>
        {this.getScreen()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const Main2 = connect(mapStateToProps)(Main);

export default Main2;
