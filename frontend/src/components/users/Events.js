import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import EventCard from "../../components/users/EventCard";

function Events() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [eventData, setEventData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter events based on search and category
  const filteredEvents = eventData.filter((event) => {
    const eventCategory = event.eventName.toLowerCase();
    return (
      (search === "" ||
        event.title.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter === "All" ||
        eventCategory === categoryFilter.toLowerCase())
    );
  });

  const handleFilterClick = () => {
    // The filtering logic is already applied when rendering filteredEvents
    // So, there's no need to add any additional logic here
  };

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-4">
        {/* ... (Search and filter controls remain the same) */}
      </Row>

      <Row>
        {eventData.length === 0 ? (
          <Col>
            <p>No events found.</p>
          </Col>
        ) : (
          eventData.map((event) => (
            <EventCard key={event.id} event={event} /> // Render an EventCard for each event
          ))
        )}
      </Row>
    </Container>
  );
}

export default Events;