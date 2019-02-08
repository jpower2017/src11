import React, { Component } from "react";
import GeneologyComponent from "./Geneology/Geneology";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";
import PersonForm from "./Form/FormContainerPerson";
import GroupOrgForm from "./Form/FormContainerOrg";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

class GeneologyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { filterStr: "", searchType: "person" };
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
      ? `${nResults} results found.  Scroll table to see more results.`
      : nResults <= 6
        ? `${nResults} results found.`
        : "No results.  Add party.";
  };
  onRadio = (event, value) => {
    console.log(value);
    this.setState(prevState => ({ searchType: value }));
    this.props.onSearchType(value);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FieldText ontext={this.filterStr} />
            <div>
              <div>Search by:</div>
              <RadioButtonGroup
                name="f"
                defaultSelected="person"
                onChange={this.onRadio}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  backgroundColor: "#ffffff"
                }}
              >
                <RadioButton value="person" label="Persons" />
                <RadioButton value="groupOrg" label="Groups/Orgs" />
              </RadioButtonGroup>
            </div>
          </div>
          <span style={{ marginLeft: "20px" }}>
            {this.searchResultsMsg(nResults)}
          </span>
          <TableContainer searchType={this.state.searchType} />
          {this.state.searchType === "person" && <PersonForm />}
          {this.state.searchType === "groupOrg" && <GroupOrgForm />}
        </div>
      </div>
    );
  }
}

export default GeneologyScreen;
