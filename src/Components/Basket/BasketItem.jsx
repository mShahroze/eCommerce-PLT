import React, { useState } from "react";
import "../Styles/BasketItem.css";
import { connect } from "react-redux";
import {
  removeFromBasket,
  adjustItemQuantity,
} from "../../Redux/Shopping/shopping-actions";

const BasketItem = ({ item, removeFromBasket, adjustQuantity }) => {
  const [input, setInput] = useState(item.quantity);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQuantity(item.id, e.target.value);
  };

  return (
    <div data-testid="basketItem" className="basketItem">
      <img className="basketItemImg" src={item.img} alt={item.name} />
      <div className="basketItemDetails">
        <p className="detailsName">{item.name}</p>
        <p className="detailsColour">{item.colour}</p>
        <p className="detailsPrice">£ {item.price}</p>
      </div>
      <div className="basketItemActions">
        <div className="basketItemQuantity">
          <label htmlFor="qty">Qty</label>
          <input
            data-testid="input"
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <button
          data-testid="removeItem"
          onClick={() => removeFromBasket(item.id)}
          className="actionsDeleteItemButton"
        >
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQuantity: (id, quantity) =>
      dispatch(adjustItemQuantity(id, quantity)),
    removeFromBasket: (id) => dispatch(removeFromBasket(id)),
  };
};

export default connect(null, mapDispatchToProps)(BasketItem);
