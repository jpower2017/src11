import React, { Component } from "react";
import { connect } from "react-redux";
import {
  searchPerson,
  setVar,
  addRelatives,
  parentChildRelationship,
  partnerRelationship
} from "../actions";
import GeneologyScreen from "./GeneologyScreen";

class GeneologyContainer extends Component {
  constructor(props) {
    console.log("GeneologyContainer construct");
    super(props);
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>

        <GeneologyScreen
          onSearchText={this.props.searchPerson}
          rows={this.props.rows}
          setCurrentSelection={this.props.setCurrentSelection}
          selectedPerson={this.props.selectedPerson}
          expandSelection={this.props.expandSelection}
          parentChildRelationship={this.props.parentChildRelationship}
          partnerRelationship={this.props.partnerRelationship}
          nResults={this.props.nResults}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.geneology ? state.giftLog.geneology : [],
  selectedPerson: state.giftLog.selectedPerson
    ? state.giftLog.selectedPerson
    : null,
  nResults: state.giftLog.searchResults ? state.giftLog.searchResults.length : 0
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  searchPerson: str => {
    dispatch(searchPerson(str));
  },

  setCurrentSelection: uuid => {
    dispatch(setVar("selectedPerson", uuid));
  },
  expandSelection: uuid => {
    dispatch(addRelatives(uuid));
  },
  parentChildRelationship: (parentUUID, childUUID, addRemove) => {
    dispatch(parentChildRelationship(parentUUID, childUUID, addRemove));
  },
  partnerRelationship: (addRemove, otherUUID, mainUUID) => {
    dispatch(partnerRelationship(addRemove, otherUUID, mainUUID));
  }
});

const GeneologyContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneologyContainer);

export default GeneologyContainer2;
