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
  Form
} from "react-bootstrap";
import { Routes as CustomRoutes } from "../../routes.js";
import jwt_decode from "jwt-decode";
import ReviewSection from "../../components/user/ReviewSection";
import axios from "axios";
import "./EventDetails.css";

function EventDetails() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [eventData, setEventData] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  const [reviews, setReviews] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("id");

  const navigate = useNavigate();

  const handleTicketQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      setTicketQuantity(quantity);
    }
  };

  const registerUserToEvent = async (eventId, userId, paymentId) => {
    const userToken = localStorage.getItem("userToken");
    const decodedToken = jwt_decode(userToken);
    try {
      const registrationResponse = await fetch(
        `${API_URL}/events/enrollment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            eventId,
            userId,
            paymentId,
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
    const userToken = localStorage.getItem("userToken");
    const decodedToken = jwt_decode(userToken);
    if (!userToken) {
      navigate(CustomRoutes.Signin.path);
    }
    try {
      const response = await fetch(
        `${API_URL}/event-feedback/create`,
        {
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
        }
      );

      if (!response.ok) {
        throw Error("Network response was not ok");
      } else {
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
      const response = await fetch(
        `${API_URL}/event-feedback/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

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
      const response = await fetch(`${API_URL}/events/${eventId}`, {
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

  const checkoutHandler = async () => {
    if (!localStorage.getItem("userToken")) {
      navigate(CustomRoutes.Signin.path);
    } else {
      const userToken = localStorage.getItem("userToken");
      const decodedToken = jwt_decode(userToken);

      const key = process.env.REACT_APP_RAZORPAY_API_KEY;
      const totalAmount = eventData.ticketPrice * ticketQuantity;
      const {
        data: { order }
      } = await axios.post(`${API_URL}/payments/checkout`, {
        amount: totalAmount
      });

      console.log(order);
      const { data } = await axios.get(
        `${API_URL}/users/info/${decodedToken.userId}`
      );
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: data.fullName,
        description: "RazorPay Payment",
        order_id: order.id,
        handler: function (response) {
          axios
            .post(`${API_URL}/payments/paymentverification`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
              // Add other required data
            })
            .then((serverResponse) => {
              // Handle the server's response
              console.log("Server response:", serverResponse);
              // After this, you can trigger other actions or handle the UI as needed
              console.log("Payment Id:", serverResponse.data.paymentId);

              handleRegistration(serverResponse.data.paymentId);
            })
            .catch((error) => {
              console.error("Error while making the POST request:", error);
              // Handle the error gracefully
            });
        },
        prefill: {
          name: data.fullName,
          email: data.userId.email,
          contact: data.contactNumber
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#050213"
        },
        redirect: true
      };
      const razor = new window.Razorpay(options);

      razor.on("payment.error", function (response) {
        // Handle payment error here
        console.log("Payment error:", response);
      });

      razor.open();
    }
  };

  const handleRegistration = async (paymentId) => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate(CustomRoutes.Signin.path);
    }
    const decodedToken = jwt_decode(userToken);
    const registrationResult = await registerUserToEvent(
      eventId,
      decodedToken.userId,
      paymentId
    );

    if (registrationResult) {
      alert("Successfully registered");
    } else {
      alert("Registration failed");
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
                      src={image}
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
                      onClick={() => checkoutHandler()}
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

      <ReviewSection reviews={reviews} handleReview={submitReview} />
    </Container>
  );
}

export default EventDetails;
