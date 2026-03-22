import React from "react";

const ProductCard = (product) => {
  return (
    <div className="col" style={{paddingRight: "17rem",  width:"19rem"}}>
      <div class="card border-color rounded-card card-hover product-card custom-bg" style={{width: "17rem"}}>
        <img
          src={product.item.Image}
          class="card-img-top rounded mx-auto d-block m-2"
          alt="img"
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
            height: "25rem"
          }}
        />
        <div class="card-body text-color">
          <h5 class="card-title d-flex justify-content-between">
            <div>
              <b>{product.item.Product_Name}</b>
            </div>
          </h5>
          <p className="card-text">
            <b>{product.item.Description}</b>
          </p>
        </div>
        <div class="card-footer">
          <div className="text-center text-color">
            <p>
            
              <span>
              
                {/* <h4>Price : &#8377;{product.item.price}</h4> */}
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-between">
          <a href={product.item.Link} target="_blank" rel="noreferrer">
                        <button className="take-to-prod" style={{width:"200px", marginLeft:"0.7rem", fontSize:"17px"}}>go to Product</button>
             </a>    
            {/* <a className="btn bg-color custom-bg-text">Add to Cart</a> */}
            <p class="text-color">
              <b>
                {/* <i>Stock :</i> {product.item.quantity} */}
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
