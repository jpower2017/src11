import React, { Component } from "react";
import * as R from "ramda";
import List from "./List";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
//import { data } from "./data.js";
import Row from "./Row";

/*  state.data = geneology,  */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      main: 1
    };
    console.table(this.props.data);
  }
  componentWillRecieveProps(nextProps) {
    console.log(" CWRP nextProps.objData ");
    console.table(nextProps.data);
    this.setState({ data: nextProps.data });
  }
  bubble = (key, val) => {
    this.setState({ [key]: val });
    //this.createRequestList(val);
  };
  getMain = () => {
    const { main, data } = this.state;
    return R.filter(x => x.id === main, data);
  };
  getOthers = relation => {
    const data = this.state.data;
    console.table(data);
    const id = this.state.main;
    let a = R.find(x => x.id === id, data);
    let rowProp = R.prop(relation, a);
    return R.filter(x => R.contains(x.id, rowProp), data);
  };
  /* addToMain adds relation to main */
  addToMain = (refID, mainID, ky, data) => {
    let mainRow = R.find(x => x.id === mainID, data);
    let otherRows = R.filter(x => x.id !== mainID, data);
    mainRow = { ...mainRow, [ky]: [...mainRow[ky], refID] };
    let newData = [...otherRows, mainRow];
    this.setState({ data: R.uniq(newData) });
    return newData;
  };
  addToRelation = (refID, mainID, ky, data) => {
    const refs = {
      parents: "children",
      partners: "partners",
      children: "parents",
      siblings: "siblings"
    };
    let row = R.find(x => x.id === refID, data);
    let otherRows = R.filter(x => x.id !== refID, data);
    row = { ...row, [refs[ky]]: [...row[refs[ky]], mainID] };
    let newData = [...otherRows, row];
    this.setState({ data: R.uniq(newData) });
  };
  addSearchResult = obj => {
    let newObj = {
      ...obj,
      parents: [],
      partners: [],
      siblings: [],
      children: []
    };
    this.setState((prevState, props) => ({
      data: R.uniq([...prevState.data, newObj])
    }));
    return R.uniq([...this.state.data, newObj]);
  };
  /* input data -> add to a prop in main row, then add to a prop in related row     */
  processSearchResult = (relation, obj) => {
    let data = this.addSearchResult(obj);
    const addMainCurry = R.curry(this.addToMain);
    const addRelationCurry = R.curry(this.addToRelation);
    const a = addMainCurry(obj.id, this.state.main, relation);
    const b = addRelationCurry(obj.id, this.state.main, relation);
    if (relation != "main") {
      let r = R.compose(
        b,
        a
      )(data);
    }
    relation == "main" && this.setState({ main: obj.id });
  };

  render() {
    return (
      <div>
        <hr style={{ borderTop: "1px dashed lightblue" }} />
        <div style={{ padding: "20px", fontWeight: "bold", color: "#ff0099" }}>
          Selecting a person, sets them as 'main'. (Setting main calls backend
          to get geneology. Input = main uuid)
        </div>
        <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ backgroundColor: "#999999", opacity: ".5" }}>
            <List
              data={this.state.data}
              bubble={val => this.bubble("main", val)}
              title="ALL"
            />
          </div>
          <div style={{ backgroundColor: "#ff0099" }}>
            <List
              data={this.getMain()}
              bubble={val => this.bubble("main", val)}
              title="Main"
            />
          </div>
          <List
            data={this.getOthers("partners")}
            bubble={val => this.bubble("main", val)}
            title="Partners"
          />
          <List
            data={this.getOthers("parents")}
            bubble={val => this.bubble("main", val)}
            title="Parents"
          />
          <List
            data={this.getOthers("children")}
            bubble={val => this.bubble("main", val)}
            title="Children"
          />
          <List
            data={this.getOthers("siblings")}
            bubble={val => this.bubble("main", val)}
            title="Siblings"
          />
        </div>
      </div>
    );
  }
}

export default App;
