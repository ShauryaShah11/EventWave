import React, { useState, useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Carousel, Image } from "react-bootstrap";
import { Routes as CustomRoutes } from "../../routes.js";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens
import PaymentModal from "../common/PaymentModal";
import "./EventDetails.css"; // Import your CSS file

function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("id");
  const userToken = localStorage.getItem("userToken");

  const navigate = useNavigate();
  // Function to handle the payment using a payment gateway
  const handlePayment = async () => {
    const decodedToken = jwt_decode(userToken);
    try {
      // Make an API request to your payment service
      const paymentResponse = await fetch('http://localhost:8000/payments/payment-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Include the token in the request headers
        },
        body: JSON.stringify({
          eventId: eventId,
          userId: decodedToken.userId,
          amount: eventData.ticketPrice,
          cardDetails: { /* Add card details here */ },
        }),
      });
  
      const responseData = await paymentResponse.json();
  
      if (paymentResponse.ok && responseData.success) {
        console.log("hello qorld!");
        return { success: true, message: 'Payment was successful' };
      } else {
        return { success: false, message: 'Payment failed' };
      }
    } catch (error) {
      return { success: false, message: 'Payment failed due to an error' };
    }
  };  

  // Function to register the user to the event
  const registerUserToEvent = async (eventId, userId) => {
    try {
      // Make an API request to your server to register the user for the event
      const registrationResponse = await fetch('http://localhost:8000/events/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Include the token in the request headers
        },
        body: JSON.stringify({
          eventId, // Event ID
          userId, // User ID
        }),
      });

      const registrationData = await registrationResponse.json();

      if (registrationResponse.ok && registrationData.success) {
        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: 'Registration failed due to an error' };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/events/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
    fetchData(); // Fetch data when the component mounts
  }, [eventId]);

  if (!eventData) {
    // Render a loading message or spinner while fetching data
    return <div>Loading...</div>;
  }

  const handleBuyTickets = () => {
    if(!userToken){
      navigate(CustomRoutes.Signin.path);
    }
    setShowPaymentModal(true);

  };

  const handlePaymentSuccess = async () => {
    const decodedToken = jwt_decode(userToken);
    const paymentResult = await handlePayment();

    if (paymentResult.success) {
      // Payment was successful, proceed with user registration
      const registrationResult = await registerUserToEvent(eventId, decodedToken.userId);

      if (registrationResult.success) {
        // Registration was successful
        setShowPaymentModal(false); // Close the modal
      } else {
        // Handle registration failure
      }
    } else {
      // Handle payment failure
    }
    setShowPaymentModal(false);

  };

  return (
    <Container className="my-5">
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
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">{eventData.eventName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {eventData.eventAddress.city}, {eventData.eventAddress.state},{" "}
                {eventData.eventAddress.country}
              </Card.Subtitle>
              <Card.Text className="mb-4">{eventData.eventDescription}</Card.Text>
              <Card.Text>
                Date: {new Date(eventData.eventDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>Ticket Price: ${eventData.ticketPrice}</Card.Text>
              <Button variant="primary" block className="mt-4" onClick={handleBuyTickets}>
                Buy Tickets
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <PaymentModal showPaymentModal={showPaymentModal} handlePaymentSuccess={handlePaymentSuccess} />
    </Container>
  );
}

export default EventDetails;
