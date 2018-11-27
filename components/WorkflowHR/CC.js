import React, { Component } from "react";
import * as R from "ramda";
//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms } from "./dataContractorConfidentiality";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
//import { validate } from "./utils/utils";
import App from "./App";
import { callModuleConfig } from "../../actions";

const config = { definitionID: "a543b3c5-b8f9-4fbc-8642-406589766aca" };

class ContractorConfidentiality extends Component {
  constructor(props) {
    console.log("ContractorConfidentiality");
    super(props);
    this.state = {
      data: []
    };
    this.props.callModuleConfig();
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.props.appConfig && (
          <App
            forms={forms}
            config={config}
            extraData={this.props.initiatorEmailAndName}
            authUserFW={false}
            appConfig={this.props.appConfig}
            url={this.props.url}
            license={this.props.license}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  initiatorEmailAndName: {
    initiatorEmail: `${state.notifications.login}`,
    formsubmittedby: `${state.notifications.user.firstName} ${
      state.notifications.user.lastName
    }`
  },

  appConfig: state.notifications.workflows
    ? R.find(
        x => x.name == "contractorConfidentialityAgreement",
        state.notifications.workflows
      )
    : null,
  url: state.notifications.flowWrightURL
    ? state.notifications.flowWrightURL
    : null,
  license: state.notifications.flowWrightLicense
    ? state.notifications.flowWrightLicense
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  callModuleConfig: () => {
    dispatch(callModuleConfig());
  }
});

const ContractorConfidentiality2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorConfidentiality);

export default ContractorConfidentiality2;
