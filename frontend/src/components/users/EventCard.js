import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    // Handle the submission, e.g., set event id in URL or perform any other action
    navigate(CustomRoutes.EventDetails.path + `?id=${event._id}`);

  };

  return (
    <Col key={event._id} md={6} lg={4} className="mb-4">
      <Card className="h-100">
        <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
          <Card.Img
            src={`http://localhost:8000/images/${event.eventImages[0]}`}
            alt={event.title}
            className="card-img-top"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{event.eventName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {event.category}
          </Card.Subtitle>
          <Card.Text>Date: {new Date(event.eventDate).toLocaleDateString()}</Card.Text>
          <Button variant="primary" block onClick={handleSubmit}>
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
