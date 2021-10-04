import React from "react";
import "./Styles/SingleItem.css";
import { connect } from "react-redux";
import { addToBasket } from "../Redux/Shopping/shopping-actions";

const SingleItem = ({ currentItem, addToBasket }) => {
  return (
    <div className="singleItem">
      <img
        className="singleItemImage"
        src={currentItem.img}
        alt={currentItem.name}
      />
      <div className="singleItemDetails">
        <p className="detailsName">{currentItem.name}</p>
        <p className="detailsColour">{currentItem.colour}</p>
        <p className="detailsPrice">£ {currentItem.price}</p>

        <button
          data-testid="addToBasket"
          onClick={() => addToBasket(currentItem.id)}
          className="detailsAddBtn"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToBasket: (id) => dispatch(addToBasket(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
