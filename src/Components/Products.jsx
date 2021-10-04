import React, { useEffect } from "react";
import "./Styles/Products.css";
import Product from "./Product.jsx";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Shopping/shopping-actions";

const Products = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.shop);
  const { loading, error, products } = productsList;
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div data-testid="products-wrapper" className="products">
      {loading
        ? "Loading..."
        : error
        ? error.message
        : products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps, { getProducts })(Products);
