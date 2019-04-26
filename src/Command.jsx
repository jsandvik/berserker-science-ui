import React, { Component } from "react";
import styles from "./Command.module.css";
import regA from "./commands/A.png";
import six from "./commands/6.png";
import reactStringReplace from "react-string-replace";


export default class Command extends Component {
  render = () => {
    const { command } = this.props;
    let imagedCommand = reactStringReplace(command, 'A', (match, i) => (
        <img className={styles.command} src={regA} />
    ));

    imagedCommand = reactStringReplace(imagedCommand, '6', (match, i) => (
        <img className={styles.direction} src={six} />
    ));

    return <span>{imagedCommand}</span>;
  };
}
