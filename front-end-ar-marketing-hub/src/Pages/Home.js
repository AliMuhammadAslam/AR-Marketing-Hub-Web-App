import React from "react";
import marketing from '../Images/marketing.jpg';
import './Home.css';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { MdTrendingUp, MdPeople, MdBarChart, MdArrowForward } from "react-icons/md";

function Home() {
    return (
        <div className="home-wrapper">

            {/* Hero Section */}
            <div className="hero-section">
                <img src={marketing} className="hero-image" alt="AR Marketing Hub" />
                <div className="hero-overlay">
                    <h1 className="hero-title">Welcome to AR Marketing Hub</h1>
                    <p className="hero-subtitle">
                        Skyrocket your brand's reach with augmented reality-powered marketing.
                    </p>
                    <div className="hero-cta">
                        <Nav.Link as={Link} to="/products">
                            <button className="cta-btn cta-primary">
                                Explore Products <MdArrowForward style={{ fontSize: '20px', marginLeft: '6px' }} />
                            </button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/events">
                            <button className="cta-btn cta-secondary">Browse Events</button>
                        </Nav.Link>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="section benefits-section">
                <h2 className="section-title">Why AR Marketing Hub?</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <MdTrendingUp className="benefit-icon" />
                        <h3>Boost Sales</h3>
                        <p>
                            Brands using AR experiences see up to 94% higher conversion rates.
                            Let your customers interact with products before they buy.
                        </p>
                    </div>
                    <div className="benefit-card">
                        <MdPeople className="benefit-icon" />
                        <h3>Grow Your Audience</h3>
                        <p>
                            Reach thousands of engaged buyers across our curated product and
                            event marketplace with targeted AR campaigns.
                        </p>
                    </div>
                    <div className="benefit-card">
                        <MdBarChart className="benefit-icon" />
                        <h3>Track Performance</h3>
                        <p>
                            Real-time analytics dashboard gives you full visibility into
                            engagement, clicks, and conversions — all in one place.
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="section steps-section">
                <h2 className="section-title">Get Started in 3 Easy Steps</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Create an Account</h3>
                        <p>Sign up for free and set up your brand or personal profile in minutes.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>List Your Products or Events</h3>
                        <p>Add your offerings to the marketplace and reach our growing community of buyers.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Watch Your Brand Grow</h3>
                        <p>Engage customers with interactive AR experiences and track results with our analytics tools.</p>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bottom-cta-section">
                <h2>Ready to get started?</h2>
                <p>Join thousands of brands already growing with AR Marketing Hub.</p>
                <Nav.Link as={Link} to="/register">
                    <button className="cta-btn cta-primary">Create Free Account</button>
                </Nav.Link>
            </div>

        </div>
    );
}

export default Home;
