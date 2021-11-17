import React from "react";
import "../css/HomeContent.css";
import { Button, Container } from 'react-bootstrap'

const HomeContent = () => {
  return (
    <Container>
      <body>
        <div className="content">
          <p className="text">
            <h2>
              <span className="orange">O</span>
              <span>utage </span>
              <span className="orange">M</span>
              <span>ap</span>
            </h2>
            Outage Map provides all users with the ability to see an outage map
            for a variety of services that are provided.
          </p>
        </div>
      </body>
    </Container>
  );
};

export default HomeContent;
