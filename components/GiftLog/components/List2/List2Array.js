import React, { Component } from "react";
import * as R from "ramda";

class List2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  getNames = objGR => {
    try {
      let names = R.map(
        x => `${x.firstName} ${x.lastName}`,
        objGR.requestPersons
      );
      return names.toString();
    } catch (e) {
      console.log("CATCH " + e.message);
    }
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
        <div style={{ border: "1px solid green", padding: "4px" }}>
          {this.props.data.map((x, i) => (
            <div style={{ backgroundColor: getColor(i) }}>
              {`${x.requestNotes}               ${this.getNames(x)}`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default List2;
