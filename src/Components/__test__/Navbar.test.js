import React from "react";
import Navbar from "../Navbar";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
  shop: {
    products: [],
    basket: [],
    currentItem: null,
    loading: true,
  },
};
const store = mockStore(initialState);
describe("Navbar", () => {
  test("header renders with correct text", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("Trend Sense");
  });
  test("Basket renders with the correct text", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const basketEl = getByTestId("basketTitle");

    expect(basketEl.textContent).toBe("Basket");
  });
  test("Basket initially starts at with text of 0", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const basketEl = getByTestId("basketCounter");

    expect(basketEl.textContent).toBe("0");
  });
});
