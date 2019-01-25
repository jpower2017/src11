import React, { Component } from "react";
import GeneologyComponent from "./Geneology/Geneology";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";
import PersonForm from "./Form/FormContainerPerson";

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
  /* if results >6 scroll to see more msg*/
  searchResultsMsg = nResults => {
    return nResults > 6
      ? `${nResults} results found.  Scroll to see more results.`
      : nResults <= 6
        ? `${nResults} results found.`
        : "No results.  Add party.";
  };
  render() {
    const { nResults } = this.props;
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
            top: "800px",
            padding: "4px",
            minWidth: "1200px"
          }}
        >
          <FieldText ontext={this.filterStr} />
          <span style={{ marginLeft: "20px" }}>
            {this.searchResultsMsg(nResults)}
          </span>
          <TableContainer />
          <PersonForm />
        </div>
      </div>
    );
  }
}

export default GeneologyScreen;
