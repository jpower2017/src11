import React, { Component } from "react";

class List2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const getColor = n => (n % 2 === 0 ? "#e6e6e6" : "#cccccc");
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div
          style={{ backgroundColor: "green", color: "white", padding: "4px" }}
        >
          Gift request data:
        </div>
        <div style={{ border: "1px solid green", padding: "4px" }}>
          {this.props.data.map((x, i) => (
            <div style={{ backgroundColor: getColor(i) }}>
              {`${x.requestNotes}               RECIPIENT NAME HERE  `}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default List2;
