import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import List from "./List";
import { assocRecipientRequest } from "../../actions";
import {
  getCurrentRequestPersons,
  getCurrentRequestOrganizations,
  getCurrentRequestGroups
} from "../../reducers";

class ListContainer extends Component {
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
        {this.props.rows && (
          <List
            data={this.props.rows}
            title="Gift parties"
            onselect={this.props.onselect}
            selection={[
              ...this.props.requestPersons,
              ...this.props.requestOrganizations,
              ...this.props.requestGroups
            ]}
            multiSelect={true}
          />
        )}
      </div>
    );
  }
}

const sortByAnchors = (rows, gen) => {
  console.table(rows);
  const groups = [];
  let genRows = R.uniq(R.filter(x => x.generation == gen, rows));
  const process = row => {
    let a = [];
    a.push(row);
    R.map(
      x => a.push(x),
      R.filter(x => R.contains(row.uuid, x.children), rows)
    );
    const parents = R.filter(x => R.contains(row.uuid, x.children), rows);
    const gran = R.map(
      x => R.filter(y => R.contains(x.uuid, y.children), rows),
      parents
    );
    R.map(x => a.push(x), gran);
    let childRows = R.filter(x => R.contains(x.uuid, row.children), rows);
    R.map(x => a.push(x), childRows);
    const grandKids = R.map(
      x => R.filter(y => R.contains(y.uuid, x.children), rows),
      childRows
    );
    R.map(x => a.push(x), grandKids);
    groups.push(a);
  };
  R.map(process, genRows);
  console.table(R.flatten(groups));
  return R.flatten(groups);
};

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.geneology
    ? sortByAnchors(state.giftLog.geneology, 3)
    : null,
  requestPersons: getCurrentRequestPersons(state),
  requestOrganizations: getCurrentRequestOrganizations(state),
  requestGroups: getCurrentRequestGroups(state)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onselect: (recipientID, obj) => {
    dispatch(assocRecipientRequest(recipientID, obj));
  }
  /*
  sendData: () => {
    dispatch(sendData());
  }
  */
});

const ListContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);

export default ListContainer2;
