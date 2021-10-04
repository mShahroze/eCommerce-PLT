import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [],
  basket: [],
  currentItem: null,
  loading: true,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case actionTypes.ADD_TO_BASKET:
      const item = state.products.find((prod) => prod.id === action.payload.id);
      const inBasket = state.basket.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        basket: inBasket
          ? state.basket.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.basket, { ...item, quantity: 1 }],
      };
    case actionTypes.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: +action.payload.quantity }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
