import * as actionTypes from "./shopping-types";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/benirvingplt/products/products"
    );
    dispatch({
      type: actionTypes.GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PRODUCTS_ERROR,
      payload: console.log(e),
    });
  }
};

export const addToBasket = (itemID) => {
  return {
    type: actionTypes.ADD_TO_BASKET,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromBasket = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_BASKET,
    payload: {
      id: itemID,
    },
  };
};

export const adjustItemQuantity = (itemID, quantity) => {
  return {
    type: actionTypes.ADJUST_ITEM_QUANTITY,
    payload: {
      id: itemID,
      quantity: quantity,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};
