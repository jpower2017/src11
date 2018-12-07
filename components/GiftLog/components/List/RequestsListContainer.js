import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import List from "./List";
//import {} from "../actions";

class RequestsListContainer extends Component {
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
        {this.props.rows ? (
          <List data={this.props.rows} title="Gift requests" />
        ) : (
          <div>No gift requests yet.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.requests ? state.giftLog.requests : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  /*
  searchPerson: str => {
    dispatch(searchPerson(str));
  },
  sendData: () => {
    dispatch(sendData());
  }
  */
});

const RequestsListContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsListContainer);

export default RequestsListContainer2;
