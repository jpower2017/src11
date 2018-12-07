import React, { Component } from "react";
import { connect } from "react-redux";
import { searchPerson, sendData } from "../actions";
import Geneology from "./Geneology";

class GeneologyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
    /* temporary */
    this.props.sendData();
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        {this.props.rows && (
          <Geneology
            onSearchText={this.props.searchPerson}
            sendData={this.props.sendData}
            rows={this.props.rows}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.geneology ? state.giftLog.geneology : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  searchPerson: str => {
    dispatch(searchPerson(str));
  },
  sendData: () => {
    dispatch(sendData());
  }
});

const GeneologyContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneologyContainer);

export default GeneologyContainer2;
