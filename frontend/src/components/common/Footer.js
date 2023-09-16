
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faDownload, faRocket } from "@fortawesome/free-solid-svg-icons";
import BS5Logo from "../../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../../assets/img/technologies/react-logo.svg";
import LaravelLogo from "../../assets/img/technologies/laravel-logo.svg";
import GitHubButton from 'react-github-btn';
import { Link } from 'react-router-dom';

const Footer =  (props) => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2019-{`${currentYear} `}
              <Card.Link href="#" target="_blank" className="text-blue text-decoration-none fw-normal">
                Occasia Event Management
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default Footer;