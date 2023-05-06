import React, { useState } from "react";
import Layout from "../../core/Layout";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../auth/helpers";
import { API_URL } from "../../config";

function AddCategory() {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const submitCategory = (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/category/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please check your form !", {
            positionClass: "toast-top-left",
          });
        } else {
          toastr.success(
            `Category ${name} Created successfully`,
            "New Category",
            {
              positionClass: "toast-top-left",
            }
          );
          setName("");
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
      <Layout title="Category" description="New Category" className="container">
        <form onSubmit={submitCategory}>
          <div className="form-group">
            <label htmlFor="category" className="text-muted">
              Category
            </label>
            <input
              type="category"
              name="category"
              id="category"
              className="form-control"
              placeholder="Add Name Of Category"
              onChange={handleChange}
              autoFocus
              required
              value={name}
            />
          </div>
          <button className="btn btn-block btn-outline-info">
            Create Category
          </button>
        </form>
      </Layout>
    </div>
  );
}

export default AddCategory;
