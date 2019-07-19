import React, {Component} from "react";
import styles from './Portrait.module.css';
import {IMAGES} from "./characterInfo.js";

export default class Portrait extends Component {
    render = () => {
        const {character} = this.props;
        const image = IMAGES[character];
        if (image === undefined) {
            return <span>{character}</span>;
        }

        return <img className={styles.portrait} src={image} alt={character} />;
    }
}