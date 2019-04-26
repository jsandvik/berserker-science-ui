import React, {Component} from "react";
import styles from './Portrait.module.css';
import yorha from './portraits/2B.png';
import amy from './portraits/amy.png';
import astaroth from './portraits/astaroth.png';
import azwel from './portraits/azwel.png';
import cervantes from './portraits/cervantes.png';
import geralt from './portraits/geralt.png';
import groh from './portraits/groh.png';
import ivy from './portraits/ivy.png';
import kilik from './portraits/kilik.png';
import maxi from './portraits/maxi.png';
import mitsurugi from './portraits/mitsurugi.png';
import nightmare from './portraits/nightmare.png';
import raphael from './portraits/raphael.png';
import seungMina from './portraits/seung-mi-na.png';
import siegfried from './portraits/siegfried.png';
import sophitia from './portraits/sophitia.png';
import taki from './portraits/taki.png';
import talim from './portraits/talim.png';
import tira from './portraits/tira.png';
import voldo from './portraits/voldo.png';
import xianghua from './portraits/xianghua.png';
import yoshimitsu from './portraits/yoshimitsu.png';
import zasalamel from './portraits/zasalamel.png';

const IMAGES = {
    "2B": yorha,
    "Amy": amy,
    "Astaroth": astaroth,
    "Azwel": azwel,
    "Cervantes": cervantes,
    "Geralt": geralt,
    "Groh": groh,
    "Ivy": ivy,
    "Kilik": kilik,
    "Maxi": maxi,
    "Mitsurugi": mitsurugi,
    "Nightmare": nightmare,
    "Raphael": raphael,
    "Seung Mi-na": seungMina,
    "Siegfried": siegfried,
    "Sophitia": sophitia,
    "Taki": taki,
    "Talim": talim,
    "Tira": tira,
    "Voldo": voldo,
    "Xianghua": xianghua,
    "Yoshimitsu": yoshimitsu,
    "Zasalamel": zasalamel,
}

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