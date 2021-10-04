import React from "react";
import BasketItem from "../Basket/BasketItem";
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

describe("BasketItem", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketItem item={initialState.shop.basket[0]} />
        </BrowserRouter>
      </Provider>
    );

    expect(container);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketItem item={initialState.shop.basket[0]} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test("change value of quantity input work correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketItem item={initialState.shop.basket[0]} />
        </BrowserRouter>
      </Provider>
    );
    const inputEl = getByTestId("input");
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((init) => [init, setState]);

    expect(inputEl.value).toBe("1");

    fireEvent.change(inputEl, {
      target: {
        value: 5,
      },
    });
    expect(inputEl.value).toBe("5");
  });
});
