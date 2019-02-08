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
              onNew={() => this.onNew()}
              onEdit={() => this.setState({ screen: 2 })}
            />
          ),
          message: "List of gift events"
        },
        {
          id: 2,
          component: <GiftEvent title="Gift Event screen" />,
          message: "Gift events details"
        },
        {
          id: 3,
          component: <GeneologyContainer title="Geneology screen" />,
          message: "Add parties (and geneology if known)"
        },
        {
          id: 4,
          component: <GiftRequests title="Gift Requests screen" />,
          message: "Gift requests. Add, associate, assign."
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
          ),
          message: "Gift event summary"
        }
      ]
    };
  }
  componentDidMount() {}

  addRequest = () => {
    console.log("Main addRequest");
    this.props.setVar("currentGiftRequest", "");
    this.setState({ screen: 4 });
  };

  onNew = () => {
    this.props.setVar("currentGiftEvent", "");
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
  getSubtitle() {
    console.log("Main getScreenData");
    const screen = R.find(x => x.id == this.state.screen, this.state.screens);
    return screen.message;
  }
  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "#6076A9",
            //  backgroundImage: "linear-gradient(#6076A9,#6f60a9)",
            width: "1200px",
            color: "#fff",
            padding: "10px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div>GIFT LOG</div>
              <div style={{ fontVariant: "small-caps" }}>
                {this.getSubtitle()}
              </div>
            </div>
            <div>
              <SubNav
                direction={n => this.direction(n)}
                currentScreen={this.state.screen}
                lastScreen={5}
              />
            </div>
          </div>
        </div>
        {this.getScreen()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setVar: (key, value) => {
    console.log("Main setVar " + [key, value]);
    dispatch(setVar(key, value));
  }
});

const Main2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default Main2;
