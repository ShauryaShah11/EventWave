import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {  Nav, Form, Image, Navbar, Dropdown, Container, InputGroup } from '@themesberg/react-bootstrap';
import {  useNavigate } from "react-router-dom";
import {Routes as CustomRoutes} from "../../routes";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens


const NavBar = () => {
  const navigate = useNavigate();

  function handleLogout(){
    localStorage.removeItem("organizerToken");
    navigate(CustomRoutes.Signin.path); // Change the route as needed
  }

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={"data:image/png;base64,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"} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">Account</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold"  onClick={() => navigate(CustomRoutes.ManageProfile.path)}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2"/> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;