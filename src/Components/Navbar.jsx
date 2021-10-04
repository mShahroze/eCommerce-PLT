import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";

import { connect } from "react-redux";

const Navbar = ({ basket }) => {
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    let count = 0;
    basket?.forEach((item) => {
      count += item.quantity;
    });

    setBasketCount(count);
  }, [basket, basketCount]);

  return (
    <div className="navBar">
      <Link to="/">
        <h1 data-testid="header" className="navBarLogo">
          Trend Sense
        </h1>
      </Link>
      <Link to="/basket">
        <div className="navBarBasket">
          <h3 data-testid="basketTitle" className="navBarBasketTitle">
            Basket
          </h3>
          <img
            className="navBarBasketTitleImg"
            src="https://image.flaticon.com/icons/svg/102/102276.svg"
            alt="shopping cart"
          />
          <div data-testid="basketCounter" className="navBarBasketCounter">
            {basketCount}
          </div>
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    basket: state.shop.basket,
  };
};

export default connect(mapStateToProps)(Navbar);
