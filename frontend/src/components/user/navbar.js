import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(CustomRoutes.Search.path+`?query=${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate(CustomRoutes.Signin.path);
  };

  return (
    <Navbar expand="lg" variant="dark" sticky="top" style={{ backgroundColor: "rgb(5, 2, 19)" }}>
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
                  value={searchQuery} // Connect to the state
                  onChange={(e) => setSearchQuery(e.target.value)} // Update the state
                  style={{
                    borderRadius: "20px 0 0 20px",
                    paddingRight: "0",
                    marginRight: "0",
                  }}
                />
                <Button variant="outline-light" style={{ borderRadius: "0 20px 20px 0" }} onClick={handleSearch}>
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
                        <Dropdown.Item onClick={() => navigate(CustomRoutes.MyProfile.path)}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate(CustomRoutes.AttendeeEvents.path)}>
                          My Events
                        </Dropdown.Item>

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
