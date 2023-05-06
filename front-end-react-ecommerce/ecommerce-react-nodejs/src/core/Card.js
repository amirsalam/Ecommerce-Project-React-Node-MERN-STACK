import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

const Card = ({ product,showViewBtn=true }) => {
  let dispatch = useDispatch()
  const showStock = (quantity) => {
     
    return quantity > 0 ? <span className="badge badge-primary">{quantity} In Stock</span> : <span className="badge badge-danger">Out of Stock</span>
 
}
  return (
    <div>
      <div className="card">
        <ShowImage
          item={product}
          url="product/photo"
          className="card-img-top"
        ></ShowImage>
        <div className="card-body my-2">
          <h4 className="card-title">{product.name}</h4>
          <p className="card-text">{product.description}...</p>
          <p className="card-text">${product.price}</p>
          
          <div class="well">
            {showStock(product.quantity)}
            <br/>
            <span>Added {moment(product.createdAt).fromNow()}</span>
          </div>
          
          {showViewBtn && (
              
          <Link to={`/product/${product._id}`}>
            
            <button className="btn btn-warning mr-1">View Product</button>
          </Link>
              )}
              {product.quantity > 0 && (

          
            <button onClick={() => dispatch(addToCart(product))} className="btn btn-info">Add To Cart</button>
          
              )}
        </div>
      </div>
    </div>
  );
};

export default Card;
