import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import List from "./List";
import { assocRecipientRequest } from "../../actions";

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
            title="Geneology people"
            onselect={this.props.onselect}
          />
        )}
      </div>
    );
  }
}

const createRequestList = data => {
  const main = 1;
  const id = 1;

  const getMain = () => {
    return R.filter(x => x.id === main, data);
  };
  const getOthers = relation => {
    console.table(data);
    const id = main;
    let a = R.find(x => x.id === id, data);
    let rowProp = R.prop(relation, a);
    return R.filter(x => R.contains(x.id, rowProp), data);
  };

  /* create list of all for selected person */
  let list = [];
  R.map(x => list.push({ ...x, relation: "parent" }), getOthers("parents"));
  list.push({
    ...getMain(id, data)[0],
    relation: "main"
  });
  list.push({
    ...getOthers("partners")[0],
    relation: "partner"
  });
  R.map(x => list.push({ ...x, relation: "sib" }), getOthers("siblings"));
  R.map(x => list.push({ ...x, relation: "child" }), getOthers("children"));
  list = R.filter(x => x.id, list);
  return list;
};

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.geneology
    ? createRequestList(state.giftLog.geneology)
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onselect: (recipientID, obj) => {
    dispatch(assocRecipientRequest(recipientID));
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
