import React, { useEffect, useState } from "react";
import './Products.css'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdSearch, MdMic, MdMicOff } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // Sync voice transcript into the search input
    useEffect(() => {
        if (transcript) setSearchQuery(transcript);
    }, [transcript]);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch, navigate, userInfo]);

    const handleMicClick = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            resetTranscript();
            SpeechRecognition.startListening();
        }
    };

    const resetAll = () => {
        setSearchQuery('');
        setSortOption('');
        resetTranscript();
        SpeechRecognition.stopListening();
    };

    const getFilteredProducts = () => {
        if (!products) return [];
        let result = [...products];

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.Product_Name?.toLowerCase().includes(q) ||
                p.Description?.toLowerCase().includes(q)
            );
        }

        if (sortOption === 'newest') {
            result.sort((a, b) => b.Product_ID - a.Product_ID);
        } else if (sortOption === 'oldest') {
            result.sort((a, b) => a.Product_ID - b.Product_ID);
        }

        return result;
    };

    const displayProducts = getFilteredProducts();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className="super-product-cont">
            <div className="header"><h1>Products</h1></div>

            <div className="search-bar-row">
                <div className="search-input-wrapper">
                    <input
                        className="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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

                <button className="search-btn" type="button">
                    <MdSearch style={{ fontSize: '18px' }} /> Search
                </button>

                <select
                    className="filter-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Filter By</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}

            {!loading && searchQuery && displayProducts.length === 0 && (
                <p style={{ textAlign: 'center', color: '#28a745', fontFamily: 'Futura-medium', fontSize: '1.1rem' }}>
                    No products found for "{searchQuery}"
                </p>
            )}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {displayProducts.map((product) => (
                    <ProductCard key={product._id} item={product} />
                ))}
            </div>
            <div className="not-footer"><h1>Want to increase your product outreach?</h1></div>
            <button className="click-here" type="button">Click here</button>
        </div>
    );
}

export default Products;
