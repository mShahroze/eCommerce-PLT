import React from "react";
import SingleItem from "../SingleItem";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  shop: {
    products: [],
    basket: [],
    currentItem: {
      id: 1,
      colour: "Black",
      name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
      price: 10,
      img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
      quantity: 1,
    },
    loading: true,
  },
};
const store = mockStore(initialState);

describe("SingleItem", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SingleItem product={initialState.shop.products[0]} />
        </BrowserRouter>
      </Provider>
    );

    expect(container);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SingleItem product={initialState.shop.products[0]} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("adds Item to Basket", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SingleItem product={initialState.shop.products[0]} />
        </BrowserRouter>
      </Provider>
    );
    const addToBasketEL = getByTestId("addToBasket");
    fireEvent.click(addToBasketEL);
    const calledActions = store.getActions();
    expect(calledActions[0].type).toBe("ADD_TO_BASKET");
  });
});
