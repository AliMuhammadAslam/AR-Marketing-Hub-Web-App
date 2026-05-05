import React from 'react'
import logo from '../Images/AR-logo.png';
import { Link, useLocation } from "react-router-dom";
import './NavigationBar.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../actions/userAction";
import { useNavigate } from 'react-router-dom';
import { MdHome, MdInfo, MdShoppingCart, MdEventNote } from "react-icons/md";

function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="main-navbar" variant="dark">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="nav-logo" alt="AR Marketing Hub" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav-collapse" className="nav-toggler" />

        <Navbar.Collapse id="main-nav-collapse">
          <Nav className="me-auto align-items-lg-center gap-1 mt-2 mt-lg-0">
            <Nav.Link as={Link} to="/" className={`nav-item-link ${isActive('/') ? 'active' : ''}`}>
              <MdHome className="nav-icon" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`nav-item-link ${isActive('/about') ? 'active' : ''}`}>
              <MdInfo className="nav-icon" /> About
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={`nav-item-link ${isActive('/products') ? 'active' : ''}`}>
              <MdShoppingCart className="nav-icon" /> Products
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className={`nav-item-link ${isActive('/events') ? 'active' : ''}`}>
              <MdEventNote className="nav-icon" /> Events
            </Nav.Link>
          </Nav>

          <Nav className="align-items-lg-center gap-2 mb-2 mb-lg-0">
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="user-nav-dropdown"
                align="end"
                className="nav-user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className="nav-item-link">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/signin" className="nav-signin-btn">Log In</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
