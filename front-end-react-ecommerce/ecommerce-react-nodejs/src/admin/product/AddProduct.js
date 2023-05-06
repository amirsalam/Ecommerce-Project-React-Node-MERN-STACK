import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../auth/helpers";
import { API_URL } from "../../config";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantiry: 0,
    price: 0,
    category: 0,
    photo: "",
    shipping: false,
  });

  const [formData, setFormData] = useState(new FormData());
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    fetch(`${API_URL}/category`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories))
      .catch((err) => console.log(err));
  };

  useEffect(() => getCategories(), []);

  const handleChange = (e) => {
    const value = e.target.id === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.id, value);
    setProduct({ ...product, [e.target.id]: value });
  };
  const submitProduct = (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/product/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please check your form !", {
            positionClass: "toast-top-left",
          });
        } else {
          toastr.success(
            `Product ${product.name} Created successfully`,
            "New Product",
            {
              positionClass: "toast-top-left",
            }
          );
          setProduct({
            name: "",
            description: "",
            quantiry: 0,
            price: 0,
            category: 0,
            photo: "",
            shipping: false,
          });
          setFormData(new FormData());
        }
      })
      .catch((err) =>
        toastr.error(err, "Server Error !", {
          positionClass: "toast-top-left",
        })
      );
  };
  return (
    <div>
      <Layout title="Product" description="New Product" className="container">
        <form onSubmit={submitProduct}>
          <div className="form-group">
            <label htmlFor="product" className="text-muted">
              name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              className="form-control"
              placeholder="Add Name Of Product"
              onChange={handleChange}
              autoFocus
              required
              value={product.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              onChange={handleChange}
              name={product.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="text-muted">
              quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="form-control"
              placeholder="Add Quantity"
              onChange={handleChange}
              autoFocus
              required
              value={product.quantity}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="text-muted">
              price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              placeholder="Add Price"
              onChange={handleChange}
              autoFocus
              required
              value={product.price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">category</label>
            <select
              onChange={handleChange}
              className="form-control"
              id="category"
              value={product.category}
            >
              {categories &&
                categories.map((category, i) => (
                  <option key={i} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="photo">Photo Product</label>
            <input
              onChange={handleChange}
              type="file"
              className="form-control-file"
              id="photo"
            />
          </div>
          <label htmlFor="shipping">Shipping</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="shipping"
              value="option1"
              checked
            />

            <label className="form-check-label" htmlFor="shipping">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="shipping"
              value="option2"
            />
            <label className="form-check-label" htmlFor="shipping">
              No
            </label>
          </div>
          <button className="my-5 btn btn-block btn-outline-info">
            Create Product
          </button>
        </form>
      </Layout>
    </div>
  );
}

export default AddProduct;
