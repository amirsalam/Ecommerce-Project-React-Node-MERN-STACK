import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helpers";
import Layout from "../core/Layout";

function Dashboard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <Fragment>
      <Layout
        title="Dashboard"
        description={`Dashboard from Ecommerce Welcome ${name}`}
        classNameName="container"
      >
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{name}</li>
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{role ? "Admin" : "User"}</li>
                </ul>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" className="btn btn-primary">
                  Button
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Links</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link className="nav-link" to="/cart">
                      My Cart
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link className="nav-link" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li className="list-group-item">{role ? "Admin" : "User"}</li>
                </ul>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" className="btn btn-primary">
                  Button
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Purshase History</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item active">Active</li>
                  <li className="list-group-item">Item</li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Badged
                    <span className="badge badge-primary badge-pill">99</span>
                  </li>
                  <li className="list-group-item disabled">Disabled</li>
                </ul>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" className="btn btn-primary">
                  Button
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}

export default Dashboard;
