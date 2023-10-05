import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Carousel,
} from "@themesberg/react-bootstrap";
import { Routes as CustomRoutes } from "../../routes";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <header
        className="hero text-black text-center py-5"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Carousel controls={false} indicators={false} interval={3000}>
          <Carousel.Item>
            <Container>
              <h1 className="display-3 mt-5">Welcome to Occasia Event Management</h1>
              <p className="lead mt-3">Plan, organize, and manage your events with ease.</p>
              <Link to={CustomRoutes.Events.path} className="btn btn-light btn-lg mt-4">
                Explore Event
              </Link>
            </Container>
          </Carousel.Item>
          {/* Add more Carousel.Items if needed */}
        </Carousel>
      </header>

      {/* Featured Events Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Featured Events</h2>
          <Row>
            {/* Featured Event 1 */}
            <Col xs={12} md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300x200"
                  alt="Event 1"
                />
                <Card.Body>
                  <Card.Title>Event 1</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Featured Event 2 */}
            <Col xs={12} md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300x200"
                  alt="Event 2"
                />
                <Card.Body>
                  <Card.Title>Event 2</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Featured Event 3 */}
            <Col xs={12} md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300x200"
                  alt="Event 3"
                />
                <Card.Body>
                  <Card.Title>Event 3</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">About Us</h2>
          <Row>
            <Col xs={12} md={6}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor vel purus venenatis, et congue lorem mollis.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <p>
                Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
