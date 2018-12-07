import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveForm } from "../../actions";

import Form from "./Form";
import { fieldsRequest } from "../../common/data";

/* to do   add array of configs from a parent wrapper */
class FormContainer extends Component {
  componentDidMount() {}

  /* todo   attachConfigOptions   */

  render() {
    return (
      <div>
        <Form fields={fieldsRequest} data={[]} onSave={this.props.saveForm} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
    dispatch(saveForm(obj, "requests"));
  }
});

const FormContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default FormContainer2;
