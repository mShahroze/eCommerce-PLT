import React from "react";
import Basket from "../Basket/Basket";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import rootReducer from "../../Redux/rootReducer";
import { removeFromBasket } from "../../Redux/Shopping/shopping-actions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  shop: {
    products: [],
    basket: [
      {
        id: 1,
        colour: "Black",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 10,
        img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
        quantity: 1,
      },
    ],
    currentItem: null,
    loading: true,
  },
};

const store = mockStore(initialState);

describe("Basket component", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Basket />
        </BrowserRouter>
      </Provider>
    );

    expect(container);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Basket />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Remove item from basket", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Basket />
        </BrowserRouter>
      </Provider>
    );
    const basketEl = getByTestId("basket");
    expect(basketEl.childElementCount).toBe(1);
    const removeItemEl = getByTestId("removeItem");
    fireEvent.click(removeItemEl);
    const calledActions = store.getActions();
    expect(calledActions[0].type).toBe("REMOVE_FROM_BASKET");
  });
});
