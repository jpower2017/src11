import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveForm } from "../../actions";

import Form from "./Form";
import { fieldsSummary } from "../../common/data";
import RaisedButton from "material-ui/RaisedButton";
import {
  getCurrentGiftEvent,
  getRequests,
  bIncidentalOrRecurring
} from "../../reducers";
import List2Obj from "../List2/List2Obj";
import List2Array from "../List2/List2Array";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import Edit from "material-ui/svg-icons/image/edit";
import Search from "material-ui/svg-icons/action/search";

/* to do   add array of configs from a parent wrapper */
class FormContainerRequest extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  addOptions(rows) {
    return rows.map(
      x =>
        x.name === "assignedTo"
          ? { ...x, options: this.props.personalAssistants }
          : x
    );
  }
  eventTypeMessage = typ => {
    return typ === "incidental"
      ? `Follow up this incidental gift event with another gift event?`
      : "Add another gift event?";
  };
  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              {this.eventTypeMessage(this.props.bIncidentalOrRecurring)}
            </div>
            <div
              onClick={() => this.props.onEdit()}
              style={{
                backgroundColor: "#f58c32",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <span style={{ padding: "4px", fontVariant: "small-caps" }}>
                Gift event
              </span>

              <Edit color="#fff" />
            </div>
            <div
              onClick={() => this.props.onAddRequest()}
              style={{
                backgroundColor: "#f58c32",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <span style={{ padding: "4px", fontVariant: "small-caps" }}>
                Request
              </span>
              <CircleAdd color="#fff" />
              <Edit color="#fff" />
            </div>

            <div
              onClick={() => this.props.onDone()}
              style={{
                backgroundColor: "#f58c32",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <span style={{ padding: "4px", fontVariant: "small-caps" }}>
                List
              </span>
              <Search color="#fff" />
            </div>
          </div>
        </div>
        {this.props.giftEvent && <List2Obj data={this.props.giftEvent} />}
        {this.props.requests && <List2Array data={this.props.requests} />}
        {this.props.personalAssistants && (
          <Form
            fields={this.addOptions(fieldsSummary)}
            data={[]}
            onSave={this.props.saveForm}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  personalAssistants: state.giftLog.personalAssistants
    ? state.giftLog.personalAssistants
    : null,
  giftEvent: getCurrentGiftEvent(state),
  requests: getRequests(state),
  bIncidentalOrRecurring: bIncidentalOrRecurring(state)
    ? bIncidentalOrRecurring(state)
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
    dispatch(saveForm(obj, "TBD"));
  }
});

const FormContainerRequest2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerRequest);

export default FormContainerRequest2;
