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
import { MdSearch } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MdMic } from "react-icons/md";


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

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    // Reset search data so sorted list shows in the main view
    setData([]);
    setQuery("");
    setErrMsg("");
  };

  const getSortedEvents = () => {
    if (!events) return [];
    const copy = [...events];
    if (selectedOption === 'option3') {
      return copy.sort((a, b) => a.Event_ID - b.Event_ID);
    }
    if (selectedOption === 'option1') {
      return copy.sort((a, b) => b.Event_ID - a.Event_ID);
    }
    return copy;
  };

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch, navigate, userInfo]);

  const setSearchQuery = (value) => {
    if (value.length === 0) {
      setData([]);
      setErrMsg("");
    }
    setQuery(value);
  };

  const resetQuery = () => {
    setQuery("");
    setData([]);
    setErrMsg("");
    setSelectedOption("");
    resetTranscript();
  };

  const fetchData = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.post(`/auth/find_event/${query}`);
      setData(res.data);
      if (!res.data?.events?.length) {
        setErrMsg("Event Not Found!");
      } else {
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg("Event Not Found!");
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const showingSearchResults = data?.events?.length > 0;
  const displayEvents = showingSearchResults ? data.events : getSortedEvents();

  return (
    <div className="super-event-cont">
      <div className="searchInput">
        <input
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={fetchData}>
          <MdSearch style={{ fontSize: '25px' }} />Search
        </button>
      </div>

      <div className="reset-query" style={{ marginLeft: "21rem", marginBottom: "20px" }}>
        <button
          className="search-box"
          style={{ width: "400px", marginRight: "15px", height: "3rem", boxShadow: "5px 5px 5px gray", borderRadius: "10px" }}
          onClick={() => { setSearchQuery(transcript); fetchData(); }}
        >
          {listening ? 'Listening: ' + transcript : transcript || 'Click mic to search by voice'}
        </button>
        <button className="speech-btn" onClick={() => SpeechRecognition.startListening()}>
          <MdMic style={{ fontSize: '25px' }} />
        </button>
        <button className="reset-btn" onClick={resetQuery}>Reset</button>
      </div>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      <div className="drop-style" style={{ position: "absolute", right: "6.5rem", top: "10rem" }}>
        <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
          <option value="" style={{ fontStyle: "italic", fontWeight: "bold" }}>----Filter By----</option>
          <option value="option1">Newest First</option>
          <option value="option2">Default</option>
          <option value="option3">Oldest First</option>
        </select>
      </div>

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
