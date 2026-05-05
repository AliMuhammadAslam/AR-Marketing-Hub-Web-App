import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo2 from '../Images/AR-logo.png';
import './Events.css'
import '../components/NavigationBar.css';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listEvents } from "../actions/eventAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { adminLogout } from "../actions/userAction";
import './adminEvent.css';
import { MdAdd, MdLogout } from 'react-icons/md';

function AdminEvents() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

    const eventList = useSelector((state) => state.eventList);
    const { loading, error, events } = eventList;

    useEffect(() => {
        if (!adminInfo) {
            navigate('/');
        }
    }, [navigate, adminInfo]);

    useEffect(() => {
        dispatch(listEvents());
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(adminLogout());
        navigate('/');
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const deleteEvent = async (Event_ID) => {
        try {
            await axios.get(`/auth/delete_event/${Event_ID}`);
            confirmAlert({
                title: 'Event Deleted',
                message: `Event with Event_ID ${Event_ID} has been deleted!`,
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => refreshPage()
                    },
                ]
            });
        } catch (error) {
            confirmAlert({
                title: 'Error',
                message: 'Failed to delete event. Please try again.',
                buttons: [{ label: 'Ok' }]
            });
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-navbar">
                <Nav.Link as={Link} to="/admin/">
                    <img src={logo2} className="admin-navbar-logo" alt="logo" />
                </Nav.Link>
                <div className="admin-navbar-actions">
                    <Nav.Link as={Link} to="/admin/addEvent">
                        <button className="admin-nav-btn"><MdAdd style={{ marginRight: 4 }} />Add Event</button>
                    </Nav.Link>
                    <button className="admin-nav-btn danger" onClick={logoutHandler}><MdLogout style={{ marginRight: 4 }} />Logout</button>
                </div>
            </div>
            <div className="admin-list-container">
                <h1 className="admin-list-header">Events</h1>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                {events && events.map(event => (
                    <div className="admin-item-card" key={event._id}>
                        <img src={event.Image} alt={event.Event_Name} />
                        <h1>{event.Event_Name}</h1>
                        <p>{event.Description}</p>
                        <div className="buttonCon1">
                            <button className="delete-event" onClick={() => deleteEvent(event.Event_ID)}>
                                Delete
                            </button>
                            <Nav.Link as={Link} to={`/admin/updateEvent/${event.Event_ID}`}>
                                <button className="update-event">Update</button>
                            </Nav.Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default AdminEvents;
