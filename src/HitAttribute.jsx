import React, { Component } from "react";
import styles from "./HitAttribute.module.css";
import high from "./hit_attributes/high.png";
import middle from "./hit_attributes/mid.png";
import low from "./hit_attributes/low.png";
import slow from "./hit_attributes/slow.png";
import smid from "./hit_attributes/smid.png";

const HIT_ATTRIBUTES = {
  high: high,
  middle: middle,
  low: low,
  "special middle": smid,
  "special low": slow
};

export default class HitAttribute extends Component {
  render = () => {
    const { attribute } = this.props;
    const image = HIT_ATTRIBUTES[attribute];
    if (image === undefined) {
      return <span>{attribute}</span>;
    }

    // load style based on normal/special
    const className = attribute.includes("special")
      ? styles.specialAttribute
      : styles.attribute;

    return <img className={className} src={image} alt={attribute} />;
  };
}
