import React, { useState, useEffect } from "react";
import "../Styles/Basket.css";
import { connect } from "react-redux";
import BasketItem from "./BasketItem";

const Basket = ({ basket }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    basket?.forEach((item) => {
      items += item.quantity;
      price += item.quantity * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [basket, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <div className="basket">
      <div data-testid="basket" className="basketItems">
        {basket?.map((item) => (
          <BasketItem key={item.id} item={item} />
        ))}
      </div>
      <div className="basketSummary">
        <h4 className="summaryName">Cart Summary</h4>
        <div className="summaryPrice">
          <span>TOTAL: {totalItems}</span>
          <span>£ {totalPrice.toFixed(2)}</span>
        </div>
        <button className="summaryCheckoutButton">Proceed To Checkout</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    basket: state.shop.basket,
  };
};

export default connect(mapStateToProps)(Basket);
