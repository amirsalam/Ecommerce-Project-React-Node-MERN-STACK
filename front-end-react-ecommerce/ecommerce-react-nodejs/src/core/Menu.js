import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_URL } from "../config";
import toastr from "toastr";
import { useSelector } from "react-redux";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ffbf00" };
  } else {
    return { color: "#fff" };
  }
};

const Menu = (props) => {
  const countItem = useSelector(state => state.cart.count)
  const signout = () => {
    fetch(`${API_URL}/signout`)
      .then(() => {
        toastr.info("User SignOut", "See You Next Time", {
          positionClass: "toast-top-left",
        });
        localStorage.removeItem("jwt_info");
        props.history.push("/signin");
      })
      .catch();
  };

  const isAuthenticated = () => {
    const jwt = localStorage.getItem("jwt_info");
    if (jwt) {
      return JSON.parse(jwt);
    }
    return false;
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand">Ecommerce</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link
                      style={isActive(props.history, "/")}
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={isActive(props.history, "/shop")}
                      className="nav-link active"
                      aria-current="page"
                      to="/shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={isActive(props.history, "/dashboard")}
                      className="nav-link active"
                      aria-current="page"
                      to={`${
                        isAuthenticated() && isAuthenticated().user.role === 1
                          ? "/admin"
                          : "#"
                      }/dashboard`}
                    >
                      Dashboard
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link
                      style={isActive(props.history, "/signin")}
                      className="nav-link"
                      to="/signin"
                    >
                      Connection
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={isActive(props.history, "/signup")}
                      className="nav-link"
                      to="/signup"
                    >
                      Register
                    </Link>
                  </li>
                </Fragment>
              )}

                <li className="nav-item">
                  <Link
                    style={isActive(props.history, "/cart")} 
                    className="nav-link"
                    to="/cart"
                  >
                    Cart <span class="badge badge-warning">{countItem}</span>
                  </Link>
                </li>
              {isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={signout}
                >
                  SignOut
                </span>
              </li>
              </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
