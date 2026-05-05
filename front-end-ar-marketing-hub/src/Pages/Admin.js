import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import logo from '../Images/AR-logo.png';
import './Admin.css';
import '../components/NavigationBar.css';
import { adminLogout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { MdEventNote, MdShoppingCart, MdLogout } from "react-icons/md";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (!adminInfo) {
      navigate('/');
    }
  }, [navigate, adminInfo]);

  const logoutHandler = () => {
    dispatch(adminLogout());
    navigate('/');
  };

  return (
    <div className="admin-page">
      {/* Admin Navbar */}
      <div className="admin-navbar">
        <Nav.Link as={Link} to="/admin">
          <img src={logo} className="admin-navbar-logo" alt="AR Marketing Hub" />
        </Nav.Link>
        <div className="admin-navbar-actions">
          <button className="admin-nav-btn danger" onClick={logoutHandler}>
            <MdLogout style={{ marginRight: 4 }} /> Logout
          </button>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="admin-dashboard">
        <h1 className="admin-dashboard-title">Admin Portal</h1>
        <p className="admin-dashboard-subtitle">Manage your products and events below.</p>

        <div className="admin-card-grid">
          <Nav.Link as={Link} to="/admin/products" className="admin-card">
            <MdShoppingCart className="admin-card-icon" />
            <h2>Products</h2>
            <p>Add, edit and remove products from the marketplace.</p>
          </Nav.Link>

          <Nav.Link as={Link} to="/admin/events" className="admin-card">
            <MdEventNote className="admin-card-icon" />
            <h2>Events</h2>
            <p>Manage events, ticket prices, and descriptions.</p>
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}
