import React, { Component } from "react";

export default class Frames extends Component {
  render = () => {
    const {frames, property, className} = this.props;

    let colorClass;
    if (frames == null) {
        colorClass = null;
    } else if (frames >= 4) {
        colorClass = "plus-high";
    } else if (frames >= 2) {
        colorClass = "plus-medium";
    } else if (frames >= 0) {
        colorClass = "plus-low";
    } else if (frames >= -9) {
        colorClass = "minus-low";
    } else if (frames >= -17) {
        colorClass = "minus-medium";
    } else if (frames < -17) {
        colorClass = "minus-high";
    }

    // make a plus show up when positive
    const plus = frames > 0 ? "+" : null;

    // show property as text if exists
    const displayText = property ? property : frames;

    return <td className={`${colorClass} ${className}`}>{plus}{displayText}</td>;
  };
}
