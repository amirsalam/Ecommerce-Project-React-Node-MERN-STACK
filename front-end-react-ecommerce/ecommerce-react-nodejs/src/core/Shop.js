import React, { useState, useEffect } from "react";
import { filterProducts, getCategories } from "./ApiCore";
import Card from "./Card";
import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";
import Layout from "./Layout";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [productFiltered, setProductFiltered] = useState([]);
  const [myFilters, setMyfilters] = useState({
    category: [],
    price: [],
  });
  useEffect(() => {
    getCategories()
     .then(res => setCategories(res))

    filterProducts(skip, limit, myFilters)
    .then(res => {
        setProductFiltered(res)
        setSkip(0)
        setSize(res.length)
    })

}, [myFilters])


const loadMore = () => {
    
    const toSkip = skip + limit;

    filterProducts(toSkip, limit, myFilters)
    .then(res => {
        setProductFiltered([...productFiltered, ...res])
        setSize(res.length)
        setSkip(toSkip)
    })
}
  const buttonToLaodMore = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="text-center">
          <button
            onClick={loadMore}
            type="button"
            className="btn btn-outline-success"
          >
            Load More
          </button>
        </div>
      )
    );
  };
  const handleFilters = (data, filterBy) => {
    setMyfilters({ ...myFilters, [filterBy]: data });

    // console.log("SHOP", data, filterBy);
  };
  return (
    <div>
      <Layout
        title="Shop page"
        description="choise Your Favorite In Our Products Store"
        className="container"
      >
        <div class="row">
          <div class="col-md-3">
            <FilterByCategory
              handleFilters={(data) => handleFilters(data, "category")}
              categories={categories}
            />
            <hr />
            <FilterByPrice
              handleFilters={(data) => handleFilters(data, "price")}
            />
          </div>
          <div class="col-md-9">
            <h1>Products Best Seller</h1>
            <div className="row">
              {productFiltered.map((product, i) => (
                <div key={product._id} className="col-md-4">
                  <Card product={product} />
                </div>
              ))}
            </div>
            {buttonToLaodMore()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Shop;
