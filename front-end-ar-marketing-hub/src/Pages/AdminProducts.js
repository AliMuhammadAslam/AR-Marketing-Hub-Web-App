import React, { useState, useEffect } from "react";
import './Products.css';
import '../components/NavigationBar.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listProducts } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { adminLogout } from "../actions/userAction";
import logo2 from '../Images/AR-logo.png';
import './adminProduct.css';
import { MdAdd, MdLogout } from 'react-icons/md';

function AdminProducts() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

    useEffect(() => {
        if (!adminInfo) {
            navigate('/');
        }
    }, [navigate, adminInfo]);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(adminLogout());
        navigate('/');
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const deleteProd = async (Product_ID) => {
        try {
            await axios.get(`/auth/delete_product/${Product_ID}`);
            confirmAlert({
                title: 'Product Deleted',
                message: `Product with Product_ID ${Product_ID} has been deleted!`,
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
                message: 'Failed to delete product. Please try again.',
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
                    <Nav.Link as={Link} to="/admin/addProduct">
                        <button className="admin-nav-btn"><MdAdd style={{ marginRight: 4 }} />Add Product</button>
                    </Nav.Link>
                    <button className="admin-nav-btn danger" onClick={logoutHandler}><MdLogout style={{ marginRight: 4 }} />Logout</button>
                </div>
            </div>
            <div className="admin-list-container">
                <h1 className="admin-list-header">Products</h1>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                {products && products.map(product => (
                    <div className="admin-item-card" key={product._id}>
                        <img src={product.Image} alt={product.Product_Name} />
                        <h1>{product.Product_Name}</h1>
                        <p>{product.Description}</p>
                        <div className="buttonCon">
                            <button className="delete-prod" onClick={() => deleteProd(product.Product_ID)}>
                                Delete
                            </button>
                            <Nav.Link as={Link} to={`/admin/updateProduct/${product.Product_ID}`}>
                                <button className="update-prod">Update</button>
                            </Nav.Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducts;
