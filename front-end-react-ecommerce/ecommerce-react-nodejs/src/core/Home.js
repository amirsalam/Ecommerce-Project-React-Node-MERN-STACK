import React, { useState, useEffect } from "react";
import { getProducts } from "./ApiCore";
import Card from "./Card";
import Layout from "./Layout";
import Search from "./Search";

function Home() {
  const [productsBestSeller, setProductsBestSeller] = useState([]);
  const [productsArrivals, setProductsArrivals] = useState([]);
  const loadBestSeller = () => {
    getProducts("solde", "desc", 6).then((products) =>
      setProductsBestSeller(products)
    );
  };
  const loadProductsArrivals = () => {
    getProducts("createdAt", "desc", 3).then((products) =>
      setProductsArrivals(products)
    );
  };
  useEffect(() => {
    loadBestSeller();
    loadProductsArrivals();
  }, []);
  return (
    <div>
      <Layout
        title="Home page"
        description="Home page from Ecommerce"
        className="container"
      >
        
        <Search/>
        <hr/>
        <h1>Arrival Products</h1>.
        <div className="row">
          {productsArrivals.map((product, i) => (
            <div className="col-md-4">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
        <hr />
        <h1>Products Best Seller</h1>
        <div className="row">
          {productsBestSeller.map((product, i) => (
            <div className="col-md-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default Home;
