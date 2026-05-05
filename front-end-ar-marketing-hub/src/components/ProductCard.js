import React from "react";

const ProductCard = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <img
          src={item.Image}
          className="card-img-top"
          alt={item.Product_Name}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ fontFamily: 'Futura-bold', color: '#003366' }}>
            {item.Product_Name}
          </h5>
          <p className="card-text flex-grow-1" style={{ fontFamily: 'Futura-medium', fontSize: '0.9rem', color: '#555' }}>
            {item.Description}
          </p>
          <div className="mt-auto pt-2">
            <a href={item.Link} target="_blank" rel="noreferrer" className="d-block">
              <button className="take-to-prod w-100">Go to Product</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
