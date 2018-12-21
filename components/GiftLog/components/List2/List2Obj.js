import React, { Component } from "react";

class List2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { eventType, eventMonth, eventDay, notes } = this.props.data;
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div
          style={{ backgroundColor: "green", color: "white", padding: "4px" }}
        >
          Gift event data:
        </div>
        <div style={{ border: "1px solid green", padding: "4px" }}>
          <div>EVENT TYPE: {eventType} </div>
          <div>EVENT DATE : {`${eventMonth}/${eventDay}`} </div>
          <div>EVENT NOTES: {notes} </div>
        </div>
      </div>
    );
  }
}

export default List2;
