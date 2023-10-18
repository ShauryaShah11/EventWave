import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Carousel,
  Image,
  Form,
  ListGroup,
  Badge
} from "react-bootstrap";
import { Routes as CustomRoutes } from "../../routes.js";
import jwt_decode from "jwt-decode";
import PaymentModal from "../../components/common/PaymentModal";
import ReviewSection from "../../components/user/ReviewSection";
import "./EventDetails.css";

function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  const [reviews, setReviews] = useState([]);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("id");
  const userToken = localStorage.getItem("userToken");
  const decodedToken = jwt_decode(userToken);

  const navigate = useNavigate();

  const handlePayment = async () => {
    const decodedToken = jwt_decode(userToken);
    try {
      const paymentResponse = await fetch(
        "http://localhost:8000/payments/payment-confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            eventId: eventId,
            userId: decodedToken.userId,
            amount: eventData.ticketPrice,
            cardDetails: {
              /* Add card details here */
            }
          })
        }
      );

      const responseData = await paymentResponse.json();

      if (paymentResponse.ok && responseData.success) {
        return { success: true, message: "Payment was successful" };
      } else {
        setErrorMessage(responseData.message || "Payment failed");
        return { success: false, message: "Payment failed" };
      }
    } catch (error) {
      setErrorMessage("Payment failed due to an error");
      return { success: false, message: "Payment failed due to an error" };
    }
  };

  const handleTicketQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      setTicketQuantity(quantity);
    }
  };

  const registerUserToEvent = async (eventId, userId) => {
    try {
      const registrationResponse = await fetch(
        "http://localhost:8000/events/enrollment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            eventId,
            userId,
            ticketQuantity
          })
        }
      );

      const registrationData = await registrationResponse.json();

      if (registrationResponse.ok && registrationData.success) {
        return true;
      } else {
        setErrorMessage(registrationData.message);
        return false;
      }
    } catch (error) {
      return { success: false, message: "Registration failed due to an error" };
    }
  };

  const submitReview = async (rating, comment) => {
    if(!userToken){
      navigate(CustomRoutes.Signin.path);
    }
    try {
      const response = await fetch(`http://localhost:8000/event-feedback/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventId: eventId,
          userId: decodedToken.userId,
          rating: rating,
          comment: comment
        })
      });

      if (!response.ok) {
        throw Error("Network response was not ok");
      }else{
        alert("Feedback submitted successfully!");
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setUserReview(""); // Clear the input field
  };

  const fetchReviews = async (eventId) => {
    // In this dummy implementation, we set some example reviews.
    try {
      const response = await fetch(`http://localhost:8000/event-feedback/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchData();
      fetchReviews(eventId);
    }
  }, [eventId]);

  const handleBuyTickets = () => {
    if (!userToken) {
      navigate(CustomRoutes.Signin.path);
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    const paymentResult = await handlePayment();

    if (paymentResult.success) {
      const registrationResult = await registerUserToEvent(
        eventId,
        decodedToken.userId
      );

      if (registrationResult) {
        setShowPaymentModal(false);
      }
    }
  };

  return (
    <Container className="my-5">
      {eventData ? (
        <Row className="event-details-container mb-5">
          <Col md={6}>
            <Carousel>
              {eventData.eventImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <div className="image-container">
                    <Image
                      src={`http://localhost:8000/images/${image}`}
                      alt={`${eventData.eventName} Image ${index}`}
                      className="d-block w-100"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6} className="event-info-column">
            <Card className="event-card">
              <Card.Body>
                <Card.Title className="event-title mb-3">
                  {eventData.eventName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted event-location">
                  Event Venue: {eventData.eventAddress.street},{" "}
                  {eventData.eventAddress.city}, {eventData.eventAddress.state},{" "}
                  {eventData.eventAddress.country}
                </Card.Subtitle>
                <Card.Text className="event-description">
                  Description: {eventData.eventDescription}
                </Card.Text>
                <Card.Text className="event-organizer">
                  Organized By: {eventData.organizerId.companyName}
                </Card.Text>
                <Card.Text className="event-price">
                  Event Date:{" "}
                  {new Date(eventData.eventDate).toLocaleDateString()}
                </Card.Text>
                <Card.Text className="event-price">
                  Ticket Price: ₹{eventData.ticketPrice}
                </Card.Text>
                <Card.Text className="event-availability">
                  Available Tickets: {eventData.ticketQuantity}
                </Card.Text>
                {eventData.ticketQuantity > 0 ? (
                  <div>
                    <Form.Group className="ticket-quantity">
                      <Form.Label>Ticket Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        onChange={handleTicketQuantityChange}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      block
                      className="mt-4 buy-button"
                      onClick={handleBuyTickets}
                    >
                      Buy Tickets
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    block
                    className="mt-4 sold-out"
                    disabled
                  >
                    Sold Out
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}

      <ReviewSection reviews={reviews} handleReview={submitReview}/>   

      <PaymentModal
        showPaymentModal={showPaymentModal}
        handlePaymentSuccess={handlePaymentSuccess}
        errorMessage={errorMessage}
      />
    </Container>
  );
}

export default EventDetails;
