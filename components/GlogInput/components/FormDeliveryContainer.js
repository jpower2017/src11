import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { updateSecondary, onTypeGift, addLocation } from "../actions";
import FormDelivery from "./FormDelivery";
import { appLogic } from "../common/data";

class FormContainer extends Component {
  componentDidMount() {}
  getFields = tab => {
    let str = R.prop("fields", R.find(x => x.tab === tab, appLogic));
    return str;
  };

  render() {
    return (
      <div>
        <FormDelivery
          fields={this.getFields("delivery")}
          data={this.props.data ? this.props.data : []}
          onSave={this.props.onSave}
          onSaveGiftLocation={this.props.onSaveGiftLocation}
          locations={this.props.locations}
          giftID={this.props.giftID}
          onType={this.props.onType}
          onAdd={this.props.onAdd}
          gift={this.props.gift}
          deliveryAddresses={this.props.deliveryAddresses}
        />
      </div>
    );
  }
}

const getDelivery = (gifts, searchID, deliveries) => {
  console.log("getOrder");
  const gift = R.find(x => x.id === searchID, gifts);
  const deliveryID = R.prop("delivery", gift);

  console.table(R.find(x => x.id === deliveryID, deliveries));
  return R.find(x => x.id === deliveryID, deliveries);
};
/*
const getLocationsOrig = (obj, locations, gifts) => {
  const arrGifts = R.map(x => x.id, obj.giftHistory);
  const filteredGifts = R.filter(x => R.contains(x.id, arrGifts), gifts);
  const arrLocations = R.map(x => x.location, filteredGifts);
  const filteredLocations = R.filter(
    x => R.contains(x.id, arrLocations),
    locations
  );
  return filteredLocations;
};
*/
const getLocations = (obj, locations, gifts) => {
  console.log("getLcations2");
  const arrGifts = R.map(x => x.id, obj.giftHistory);
  const filteredGifts = R.filter(x => R.contains(x.id, arrGifts), gifts);
  console.table(filteredGifts);
  const getLocs = gift => {
    let counter = 0;
    const deliv = R.prop("delivery", gift);
    if (!deliv) {
      return;
    }
    const loc = R.prop("location", deliv);
    if (!loc) {
      return;
    }
    const addy = R.prop("formattedAddress", loc);
    if (!addy) {
      return;
    }

    return { name: addy[0], title: addy[0], value: counter++ };
  };
  let locs = R.map(x => getLocs(x), filteredGifts);
  console.table(locs);
  if (!locs[0]) {
    return;
  }
  return locs;
};
const getDeliveries = (obj, locations, gifts) => {
  console.log("getetDeliveries");
  const arrGifts = R.map(x => x.id, obj.giftHistory);
  const filteredGifts = R.filter(x => R.contains(x.id, arrGifts), gifts);
  console.table(filteredGifts);
  const getLocs = gift => {
    let counter = 0;
    const deliv = R.prop("delivery", gift);
    if (!deliv) {
      return;
    }
    const loc = R.prop("location", deliv);
    if (!loc) {
      return;
    }
    const addy = R.prop("formattedAddress", loc);
    if (!addy) {
      return;
    }

    return { name: addy[0], title: addy[0], value: counter++ };
  };
  let locs = R.map(x => getLocs(x), filteredGifts);
  console.table(locs);
  if (!locs[0]) {
    return;
  }
  return locs;
};

const getValues = arrObj => {
  console.log("getValues ");
  return R.map(x => x.id, arrObj);
};

const mapStateToProps = (state, ownProps) => ({
  data:
    state.glogInput.searchID != 0.01
      ? getDelivery(
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.deliveries
        )
      : null,

  giftID: R.prop(
    "id",
    R.find(x => x.id === state.glogInput.searchID, state.glogInput.gifts)
  ),
  gift: R.find(x => x.id === state.glogInput.searchID, state.glogInput.gifts),
  locations: getLocations(
    R.find(
      x => x.id == state.glogInput.selectedRow,
      state.glogInput.giftEventInstances
    ),
    state.glogInput.locations,
    state.glogInput.gifts
  ),
  deliveryAddresses: getDeliveries(
    R.find(
      x => x.id == state.glogInput.selectedRow,
      state.glogInput.giftEventInstances
    ),
    state.glogInput.locations,
    state.glogInput.gifts
  )

  //title: this.props.data ? "Data for item selected" : "Select item"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: obj => {
    dispatch(updateSecondary(obj, "deliveries"));
  },
  onSaveGiftLocation: obj => {
    dispatch(updateSecondary(obj, "gifts"));
  },
  onType: (payload, giftID) => {
    dispatch(onTypeGift(payload, giftID));
  },
  onAdd: (payload, node, bool) => {
    dispatch(addLocation(payload, node, bool));
  }
});

const FormContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default FormContainer2;
