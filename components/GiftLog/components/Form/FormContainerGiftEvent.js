import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";

import Form from "./Form";
import { fieldsGiftEvent } from "../../common/data";

/* to do   add array of configs from a parent wrapper */
class FormContainer extends Component {
  componentDidMount() {}

  /* todo   attachConfigOptions   */

  render() {
    return (
      <div>
        <Form fields={fieldsGiftEvent} data={[]} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

const FormContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default FormContainer2;
