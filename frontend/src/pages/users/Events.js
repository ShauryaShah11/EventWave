import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

const allEvents = [
  {
    id: 1,
    title: "Event 1",
    category: "Category A",
    date: "2023-09-20",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 2,
    title: "Event 2",
    category: "Category A",
    date: "2023-09-20",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 3,
    title: "Event 1",
    category: "Category A",
    date: "2023-09-20",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 4,
    title: "Event 1",
    category: "Category A",
    date: "2023-09-20",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 5,
    title: "Event 1",
    category: "Category A",
    date: "2023-09-20",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 6,
    title: "Event 1",
    category: "Category A",
    date: "2023-09-20",
    image: "https://via.placeholder.com/300x200"
  }
  
  // Add more events here
];

function Events() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filter events based on search and category
  const filteredEvents = allEvents.filter((event) => {
    const eventCategory = event.category.toLowerCase();
    return (
      (search === "" ||
        event.title.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter === "All" ||
        eventCategory === categoryFilter.toLowerCase())
    );
  });

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-4">
        <Col md={6}>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search Events"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              as="select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Category A">Category A</option>
              {/* Add more categories if needed */}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button
            variant="primary"
            className="w-100"
            onClick={() => {
              // Add your filter logic here
            }}
          >
            Apply Filters
          </Button>
        </Col>
      </Row>

      <Row>
        {filteredEvents.length === 0 ? (
          <Col>
            <p>No events found.</p>
          </Col>
        ) : (
          filteredEvents.map((event) => (
            <Col key={event.id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={event.image} alt={event.title} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {event.category}
                  </Card.Subtitle>
                  <Card.Text>Date: {event.date}</Card.Text>
                  <Button variant="primary" block>
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Events;
