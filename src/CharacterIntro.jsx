import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NAMES, LARGE_IMAGES } from "./characterInfo.js";

export default class CharacterIntro extends Component {
  render = () => {
    const {character} = this.props;

    return (
      <Container>
      <Card className="m-2">
        <Row noGutters>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{NAMES[character]}</Card.Title>
              <Card.Text className="d-none d-lg-block">
                Heishiro Mitsurugi relied on his sword to see him through the
                turbulence of the warring states period in his homeland, Japan.
                Hoever, with the revolutionary introduction of the rifle (known
                as "Tanegashima") from abroad, he felt his blade was no longer
                up to scratch, and so departed for foreign lands in search of
                Soul Edge. Alas, he returned empty handed... While back in his
                mother country, he entered a tournament that saw him pitted
                against Tanegashima. This, too, ended in failure, when he was
                shot in his right shoulder. The even nevertheless inspired
                Mitsurugi, imbuing him with an insatiable thirst for knowledge
                about fighting techniques, and in time he became a truly great
                warrior. All that remained now was getting his hands on a
                powerful weapon...
              </Card.Text>
              <Card.Text>
                <small class="text-muted">Last updated patch 1.3</small>
              </Card.Text>
            </Card.Body>
          </Col>
          <Col xs={4}>
            <Card.Img src={LARGE_IMAGES[character]} />
          </Col>
        </Row>
      </Card>
      </Container>
    );
  };
}
