import React, { Component } from "react";
import * as R from "ramda";
import { typography } from "material-ui/styles";

class List2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  getNames = objGR => {
    try {
      let names = R.map(
        x => (x.name ? x.name : `${x.firstName} ${x.lastName}`),
        [
          ...objGR.requestPersons,
          ...objGR.requestGroups,
          ...objGR.requestOrganizations
        ]
      );
      return names.toString();
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  };
  getAssignedTo = objGR => {
    const assign = R.path(["requestGifts", 0, "gift", "assignedTo"], objGR);
    return assign;
  };
  render() {
    const getColor = n => (n % 2 === 0 ? "#e6e6e6" : "#cccccc");
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div
          style={{ backgroundColor: "green", color: "white", padding: "4px" }}
        >
          Gift request:
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#66b266",
            color: "#fff",
            fontWeight: typography.fontWeightLight,
            fontVariant: "small-caps"
          }}
        >
          <div>Request</div>
          <div>Party</div>
          <div>Assigned to</div>
        </div>
        <div
          style={{
            border: "1px solid green",
            padding: "2px"
          }}
        >
          {this.props.data.map((x, i) => (
            <div
              style={{
                backgroundColor: getColor(i),
                display: "flex",
                justifyContent: "space-around",

                fontSize: 20,
                height: "40px",
                fontWeight: typography.fontWeightLight
              }}
            >
              <div>{x.requestNotes}</div>
              <div>{this.getNames(x)} </div>
              <div>{this.getAssignedTo(x)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default List2;
