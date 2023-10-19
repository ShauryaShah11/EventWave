import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col,  } from "react-bootstrap";
import EventCard from "../../components/user/EventCard";
import { useLocation } from "react-router-dom";

function SearchResult() {
  const [search, setSearch] = useState("");
  const [eventData, setEventData] = useState([]);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  const fetchData = useCallback(async () => {
    try {
      console.log(searchQuery);

      const response = await fetch(
        `http://localhost:8000/events/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container className="mt-4 mb-4">
      <Row>
        {eventData.length === 0 ? (
          <Col className="text-center my-5">
            <p className="text-muted display-4 mt-5 mb-5">No events found.</p>
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

export default SearchResult;
