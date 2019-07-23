import React, { Component } from "react";
import styles from "./MoveProperty.module.css";
import BA from "./move_properties/BA.png";
import GI from "./move_properties/GI.png";
import LH from "./move_properties/LH.png";
import RE from "./move_properties/RE.png";
import SC from "./move_properties/SC.png";
import SG from "./move_properties/SG.png";
import SS from "./move_properties/SS.png";
import TH from "./move_properties/TH.png";
import UA from "./move_properties/UA.png";
import Tooltip from "@material-ui/core/Tooltip";

const MOVE_PROPERTIES = {
  BA: BA,
  GI: GI,
  LH: LH,
  RE: RE,
  SC: SC,
  SG: SG,
  SS: SS,
  TH: TH,
  UA: UA
};

export default class MoveProperty extends Component {
  render = () => {
    const { property, lethalHitCondition } = this.props;
    const image = MOVE_PROPERTIES[property];
    if (image === undefined) {
      return <span>{property}</span>;
    }

    if (lethalHitCondition && property == "LH") {
      return (
        <Tooltip title={lethalHitCondition}>
          <img className={styles.property} src={image} alt={property} />
        </Tooltip>
      );
    }

    return <img className={styles.property} src={image} alt={property} />;
  };
}
