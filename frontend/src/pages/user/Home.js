import React, { useEffect, useCallback, useState } from "react";
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
  const [featuredEvents, setFeaturedEvents] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;
  console.log(process.env.REACT_APP_API_URL)
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/events/featured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFeaturedEvents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {/* Hero Section */}
      <header
        className="hero text-white text-center py-11"
        style={{
          background:
            "url('https://images.pexels.com/photos/2952834/pexels-photo-2952834.jpeg?auto=compress&cs=tinysrgb&w=1920') center/cover no-repeat",
        }}
      >
        <Carousel controls={false} indicators={false} interval={3000}>
          <Carousel.Item>
            <Container>
              <h1 className="display-3 mt-5">
                Welcome to Occasia Event Management
              </h1>
              <p className="lead mt-3">
                Plan, organize, and manage your events with ease.
              </p>
              <Link
                to={CustomRoutes.Events.path}
                className="btn btn-primary btn-lg mt-4"
              >
                Explore Events
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
            {featuredEvents.map((event) => (
              <Col key={event._id} xs={12} md={4}>
                <Card className="mb-4">
                  <Card.Img
                    variant="top"
                    src={event.eventImages[0]}
                    alt={event.eventName}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      width: "100%",
                    }} // Inline CSS
                  />
                  <Card.Body className="d-flex flex-column align-items-center">
                    <Card.Title className="text-center">
                      {event.eventName}
                    </Card.Title>
                    <Button
                      as={Link}
                      to={`${CustomRoutes.EventDetails.path}?id=${event._id}`}
                      variant="primary"
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                condimentum tortor vel purus venenatis, et congue lorem mollis.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <p>
                Vestibulum id ligula porta felis euismod semper. Praesent
                commodo cursus magna, vel scelerisque nisl consectetur. Fusce
                dapibus, tellus ac cursus commodo.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
