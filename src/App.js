import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Basket from "./Components/Basket/Basket";
import SingleItem from "./Components/SingleItem";
import { connect } from "react-redux";

function App({ currentItem }) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/basket" exact component={Basket} />
          {!currentItem ? (
            <Redirect to="/" />
          ) : (
            <Route exact path="/products/:id" component={SingleItem} />
          )}
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(App);
