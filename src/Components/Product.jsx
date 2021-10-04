import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Product.css";
import { connect } from "react-redux";
import {
  addToBasket,
  loadCurrentItem,
} from "../Redux/Shopping/shopping-actions";

const Product = ({ product, addToBasket, loadCurrentItem }) => {
  return (
    <div className="product">
      <img className="productImg" src={product.img} alt={product.name} />

      <div className="productDetails">
        <p className="productDetailsName">{product.name}</p>
        <p className="productDetailsColour">{product.colour}</p>
        <p className="productDetailsPrice">£ {product.price}</p>
      </div>

      <div className="productButtons">
        <Link to={`/products/${product.id}`}>
          <button
            onClick={() => loadCurrentItem(product)}
            className="productButtonsBtn productButtonsView"
          >
            View Item
          </button>
        </Link>
        <button
          onClick={() => addToBasket(product.id)}
          className="productButtonsBtn productButtonsAdd"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToBasket: (id) => dispatch(addToBasket(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
