import React, { useEffect } from "react";
import './Products.css'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";


function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch, navigate, userInfo]);

    return (
        <div className="super-product-cont">
            <div className="header"><h1>Products</h1></div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
                {products && products.map((product) => (
                    <ProductCard key={product._id} item={product} />
                ))}
            </div>
            <div className="not-footer"><h1>Want to increase your product outreach?</h1></div>
            <button className="click-here" type="button">Click here</button>
        </div>
    );
}

export default Products;
