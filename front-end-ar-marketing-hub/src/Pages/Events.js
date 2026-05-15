import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Events.css'
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listEvents } from "../actions/eventAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import { MdSearch, MdMic, MdMicOff } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function Events() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Sync voice transcript into the search input
  useEffect(() => {
    if (transcript) setQuery(transcript);
  }, [transcript]);

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch, navigate, userInfo]);

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening();
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setData([]);
    setQuery("");
    setErrMsg("");
  };

  const getSortedEvents = () => {
    if (!events) return [];
    const copy = [...events];
    if (selectedOption === 'option1') return copy.sort((a, b) => b.Event_ID - a.Event_ID);
    if (selectedOption === 'option3') return copy.sort((a, b) => a.Event_ID - b.Event_ID);
    return copy;
  };

  const resetQuery = () => {
    setQuery("");
    setData([]);
    setErrMsg("");
    setSelectedOption("");
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  const fetchData = async () => {
    if (!query.trim()) return;
    SpeechRecognition.stopListening();
    try {
      const res = await axios.post(`/auth/find_event/${query}`);
      setData(res.data);
      if (!res.data?.events?.length) {
        setErrMsg("No events found.");
      } else {
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg("Event not found.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchData();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const showingSearchResults = data?.events?.length > 0;
  const displayEvents = showingSearchResults ? data.events : getSortedEvents();

  return (
    <div className="super-event-cont">

      {/* Single unified search bar */}
      <div className="search-bar-row">
        <div className="search-input-wrapper">
          <input
            className="search"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`mic-btn ${listening ? 'listening' : ''}`}
            onClick={handleMicClick}
            title={listening ? 'Stop listening' : 'Search by voice'}
            type="button"
          >
            {listening ? <MdMicOff style={{ fontSize: '20px' }} /> : <MdMic style={{ fontSize: '20px' }} />}
          </button>
        </div>

        <button className="search-btn" onClick={fetchData} type="button">
          <MdSearch style={{ fontSize: '18px' }} /> Search
        </button>

        <select className="filter-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Filter By</option>
          <option value="option1">Newest First</option>
          <option value="option3">Oldest First</option>
        </select>
      </div>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      <div className="header">
        <h1>{showingSearchResults ? 'Search Results' : 'Events'}</h1>
      </div>

      {errMsg && (
        <p style={{ textAlign: 'center', color: '#28a745', fontFamily: 'Futura-medium', fontSize: '1.1rem' }}>{errMsg}</p>
      )}

      {displayEvents.map(event => (
        <div className="event-container" key={event._id}>
          <img src={event.Image} className="event-image" alt={event.Event_Name} />
          <h1>{event.Event_Name}</h1>
          <p>{event.Description}</p>
          <div className="ticket-btn-row">
            {userInfo ? (
              <Nav.Link as={Link} to={`/ticket/${event.Event_ID}`}>
                <button className="book-a-ticket">Get Your Ticket</button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/signin">
                <button className="book-a-ticket">Sign In to Get Your Ticket</button>
              </Nav.Link>
            )}
          </div>
        </div>
      ))}

      <div className="not-footer-event"><h1>Looking to Advertise Your Event?</h1></div>
      <button className="click-here" type="button">Click here</button>
    </div>
  );
}

export default Events;
