import React, { Component } from "react";

export default class Frames extends Component {
  render = () => {
    const {frames, property} = this.props;

    let className;
    if (frames == null) {
        className = null;
    } else if (frames >= 4) {
        className = "plus-high";
    } else if (frames >= 2) {
        className = "plus-medium";
    } else if (frames >= 0) {
        className = "plus-low";
    } else if (frames >= -9) {
        className = "minus-low";
    } else if (frames >= -17) {
        className = "minus-medium";
    } else if (frames < -17) {
        className = "minus-high";
    }

    // make a plus show up when positive
    const plus = frames > 0 ? "+" : null;

    // show property as text if exists
    const displayText = property ? property : frames;

    return <td className={className}>{plus}{displayText}</td>;
  };
}
