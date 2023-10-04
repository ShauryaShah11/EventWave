import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

function EventDetails() {
  const [eventData, setEventData] = useState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/events/${eventId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Fetch data when the component mounts
  }, [eventId]);

  if (!eventData) {
    // Render a loading message or spinner while fetching data
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          {/* Event images */}
          <Row>
            {eventData.eventImages.map((image, index) => (
              <Col key={index} xs={4} className="mb-3">
                <Image
                  src={`http://localhost:8000/images/${image}`}
                  alt={`${eventData.eventName} Image ${index}`}
                  fluid
                  className="event-image"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                {eventData.eventName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {eventData.eventAddress.city}, {eventData.eventAddress.state},{" "}
                {eventData.eventAddress.country}
              </Card.Subtitle>
              <Card.Text className="mb-4">
                {eventData.eventDescription}
              </Card.Text>
              <Card.Text>
                Date:{" "}
                {new Date(eventData.eventDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                Ticket Price: ${eventData.ticketPrice}
              </Card.Text>
              <Button
                variant="primary"
                block
                className="mt-4"
              >
                Buy Tickets
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
