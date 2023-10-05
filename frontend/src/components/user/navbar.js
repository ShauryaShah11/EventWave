import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {Routes as CustomRoutes} from "../../routes";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  // Function to handle the search action
  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };
  // Check if the userToken is set in local storage


  // Function to handle logout
  const handleLogout = () => {
    // Remove userToken from local storage
    localStorage.removeItem("userToken");

    // Redirect to the login page or any other appropriate route
    navigate(CustomRoutes.Signin.path); // Change the route as needed
  };

  return (
    <Navbar expand="lg" variant="dark" sticky="top" style={{ backgroundColor: "#2874f0" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#fff", fontWeight: "bold", fontSize: "24px" }}>
          Event Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Row className="align-items-center">
            <Col xs={12} md={6} lg={8}>
              <Form.Group className="d-flex mb-0">
                <Form.Control
                  type="text"
                  placeholder="Search events"
                  className="mr-2"
                  style={{
                    borderRadius: "20px 0 0 20px",
                    paddingRight: "0",
                    marginRight: "0",
                  }}
                />
                <Button variant="outline-light" style={{ borderRadius: "0 20px 20px 0" }}>
                  Search
                </Button>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={4} className="mt-3 mt-md-0">
              <Nav className="ml-auto">
                <Nav.Item>
                  <Nav.Link as={Link} to="/events" style={{ color: "#fff" }}>
                    Events
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/" style={{ color: "#fff" }}>
                    About
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/" style={{ color: "#fff" }}>
                    Contact
                  </Nav.Link>
                </Nav.Item>
                {userToken ? (
                  <Nav.Item>
                    <Dropdown alignRight>
                      <Dropdown.Toggle variant="link" id="profile-dropdown" style={{ color: "#fff" }}>
                        Account
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                ) : (
                  <Nav.Item>
                    <Nav.Link as={Link} to={CustomRoutes.Signin.path} style={{ color: "#fff" }}>
                      Login
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
