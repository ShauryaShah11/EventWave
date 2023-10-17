import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";

const EventCard = ({ event }) => {
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
          <Button as={Link} to={`${CustomRoutes.EventDetails.path}?id=${event._id}`} variant="primary">
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
