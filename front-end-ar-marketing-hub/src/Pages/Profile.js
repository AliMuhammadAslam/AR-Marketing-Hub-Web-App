import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import proPic from '../Images/profpic.png';
import { useDispatch, useSelector } from "react-redux";
import { updateUser, userLogout } from "../actions/userAction";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function Profile() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState(userInfo?.name || '');
    const [contact, setContact] = useState(userInfo?.contact || '');
    const [address, setAddress] = useState(userInfo?.address || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const logoutHandler = () => {
        dispatch(userLogout());
        navigate('/');
    };

    const updateInfo = (e) => {
        e.preventDefault();
        dispatch(updateUser(userInfo.id, name, contact, address));
        confirmAlert({
            title: 'Profile Updated',
            message: 'Your information has been updated.',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => logoutHandler()
                },
            ]
        });
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1 className="profile-page-title">My Profile</h1>

                <div className="profile-layout">
                    <div className="profile-avatar-col">
                        <img src={proPic} className="profile-pic" alt="Profile" />
                    </div>

                    <div className="profile-form-col">
                        <form onSubmit={updateInfo}>
                            <label className="profile-field-label">Name</label>
                            <input
                                className="profile-field-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="profile-field-label">Email Address</label>
                            <input
                                className="profile-field-input"
                                type="email"
                                defaultValue={userInfo?.email}
                                disabled
                            />

                            <label className="profile-field-label">Contact Number</label>
                            <input
                                className="profile-field-input"
                                type="text"
                                placeholder="Enter contact number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />

                            <label className="profile-field-label">Address</label>
                            <input
                                className="profile-field-input"
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <button className="profile-update-btn" type="submit">Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
