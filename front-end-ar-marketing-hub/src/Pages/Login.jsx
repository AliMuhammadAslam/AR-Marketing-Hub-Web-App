import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import logo from '../Images/AR-logo.png';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from 'react-bootstrap';
import { login } from "../actions/userAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        } else if (adminInfo) {
            navigate('/admin');
        }
    }, [navigate, userInfo, adminInfo]);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setEmail('');
        setPassword('');
    };

    return (
        <div className="super-cont">
            <div className="login-form">
                <div className="auth-form-container">
                    <Nav.Link as={Link} to="/"><img src={logo} className="App-logo-signin" alt="logo" /></Nav.Link>
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    {loading && <Loading />}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="email-label">
                            <MdEmail style={{ fontSize: '25px' }} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <input
                            value={email}
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="pass-label">
                            <FaLock style={{ fontSize: '25px' }} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <input
                            value={password}
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="login" type="submit">Log In</button>
                        <div>
                            <button className="forgot-pass" type="button">
                                <span style={{ color: "red" }}>Forgot Password?</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <Nav.Link as={Link} to="/register">
                        <button className="link-btn" type="button">
                            Don't have an account?<span style={{ color: "#003366" }}> Sign Up</span>
                        </button>
                    </Nav.Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
