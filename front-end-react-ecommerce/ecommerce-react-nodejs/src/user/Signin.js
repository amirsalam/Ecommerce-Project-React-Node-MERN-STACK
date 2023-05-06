import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.css";
import Layout from "../core/Layout";
import { API_URL } from "../config";

const Signin = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };
  const submitSignin = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please check your form !", {
            positionClass: "toast-top-left",
          });
        } else {
          toastr.info("User authenticated successfully", "Welcome", {
            positionClass: "toast-top-left",
          });
          localStorage.setItem("jwt_info", JSON.stringify(res));
          props.history.push("/");
        }
      })
      .catch((err) =>
        toastr.error(err, "Server Error !", {
          positionClass: "toast-top-left",
        })
      );
  };

  const form = () => (
    <form onSubmit={submitSignin}>
      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          placeholder=""
          onChange={handelChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          placeholder=""
          onChange={handelChange}
        />
      </div>
      <button className="btn btn-block btn-outline-info">SignIn</button>
    </form>
  );

  return (
    <div>
      <Layout
        title="SignIn"
        description="SignIn from Ecommerce"
        className="container"
      >
        <div className="row">
          <div className="col-md-6 mx-auto"> {form()} </div>
        </div>
      </Layout>
    </div>
  );
};

export default Signin;
