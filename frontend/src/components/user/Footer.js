import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              condimentum tortor vel purus venenatis, et congue lorem mollis.
            </p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <address>
              123 Main Street<br />
              City, State, Zip Code<br />
              Email: example@example.com<br />
              Phone: (123) 456-7890
            </address>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-3" />
        <div className="text-center">
          &copy; {new Date().getFullYear()} Event Management System
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
