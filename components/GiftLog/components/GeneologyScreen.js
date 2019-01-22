import React, { Component } from "react";
import GeneologyComponent from "./Geneology/Geneology";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";

class GeneologyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1, filterStr: "" };
  }
  componentDidMount() {}
  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);
    if (v.length > 2) {
      this.setState({ showForm: true });
    }
    this.setState({ filterStr: v });
    this.props.onSearchText(v);
  };

  render() {
    return (
      <div>
        <GeneologyComponent
          data={this.props.rows}
          setCurrentSelection={this.props.setCurrentSelection}
          selectedPerson={this.props.selectedPerson}
          expandSelection={this.props.expandSelection}
          parentChildRelationship={(parentUUID, childUUID, addRemove) =>
            this.props.parentChildRelationship(parentUUID, childUUID, addRemove)
          }
          partnerRelationship={this.props.partnerRelationship}
        />
        <div
          style={{
            padding: "20px",
            color: "white",
            backgroundColor: "green",
            position: "absolute",
            top: "800px"
          }}
        >
          Search person and add to geneology
          <FieldText ontext={this.filterStr} />
          <TableContainer />
        </div>
      </div>
    );
  }
}

export default GeneologyScreen;
