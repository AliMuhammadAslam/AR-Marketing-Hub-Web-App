import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './About.css'
import { listAbout } from "../actions/aboutAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function About() {
    const dispatch = useDispatch();

    const aboutList = useSelector((state) => state.aboutList);
    const { loading, error, about } = aboutList;

    useEffect(() => {
        dispatch(listAbout());
    }, [dispatch]);

    return (
        <div className="about-page">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}

            {about && (
                <>
                    <div className="about-title-section">
                        <h1 className="about-title">{about.title}</h1>
                    </div>

                    <div className="about-section about-section-left">
                        <img src={about.Image1} className="about-img" alt="about section 1" />
                        <p className="about-text">{about.text1}</p>
                    </div>

                    <div className="about-section about-section-right">
                        <p className="about-text">{about.text2}</p>
                        <img src={about.Image2} className="about-img" alt="about section 2" />
                    </div>
                </>
            )}
        </div>
    );
}

export default About;
