import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helpers";
import Layout from "../core/Layout";

function AdminDashboard() {
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{name}</li>
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{role ? "Admin" : "User"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Admin Links</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">
                      Create Category
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link className="nav-link" to="/create/product">
                      Create Products
                    </Link>
                    <Link className="nav-link" to="/admin/order">
                      View Orders
                    </Link>
                  </li>
                  <li className="list-group-item">{role ? "Admin" : "User"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}

export default AdminDashboard;
