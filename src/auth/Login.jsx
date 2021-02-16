import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Usercontext from "../Context/Usercontext";
import Errorhandel from "../Errorhandel";
import style from "./Login.module.css";
import backgroundimage from "../Asserts/backgroundimage.png";

import network from "../Asserts/Network.png";

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loginError, setloginError] = useState();
  const history = useHistory();
  const { setuserData } = useContext(Usercontext);
  const handel_signin = () => {
    history.push("/register");
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const userRes = await axios.post(
        "https://mern-image-upload.herokuapp.com/api/v1/user/login",
        {
          email,
          password,
        }
      );

      setuserData({
        token: userRes.data.token,
        userName: userRes.data.user.name,
        userEmail: userRes.data.user.email,
      });
      window.localStorage.setItem("auth-token", userRes.data.token);
      history.push("/accessuser/*");
    } catch (error) {
      error.response.data.passwordmsg &&
        setloginError(error.response.data.passwordmsg);
    }
  };
  return (
    <>
      <header className={` ${style.header__container}`}>
        <div className="row">
          <div className={`col-sm-1 ${style.top_position}`}>.</div>
          <div
            className={`col-md-3 ${style.login_form}`}
            style={{ marginTop: "10px" }}
          >
            <img
              src={network}
              alt="sad network"
              className="my-5"
              width="200px"
            />

            <form onSubmit={submit}>
              {loginError && (
                <Errorhandel
                  message={loginError}
                  clearError={() => setloginError(undefined)}
                />
              )}
              <h3 className={`${style.form_header}`}>Login your accound</h3>
              <div className="mb-3 mt-3">
                <label className="form-label">
                  <b>Email Address</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  placeholder="Enter email address"
                  onChange={(e) => setemail(e.target.value)}
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  onChange={(e) => setpassword(e.target.value)}
                  className="form-control"
                />
              </div>

              <button className={`${style.login_btn}`} type="submit">
                Login
              </button>
              <p className="pt-4 pb-2  ">
                Dont't have an accound?
                <strong
                  onClick={handel_signin}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    paddingLeft: "5px",
                  }}
                >
                  Signin
                </strong>
              </p>
            </form>
          </div>
          

          <div className={`col-md-8 ${style.rightside_container}`}>
            <img
              src={backgroundimage}
              className="img-fluid"
              alt="backgroundimage"
            />
          </div>
        </div>
      </header>
      {/* media queary screen */}
      <div className={`${style.responsive_screen}`}>
        <p className={`${style.p}`}></p>
          <img
              src={network}
              alt="sad network"
              className="my-3"
              width="200px"
            />
              <h3 className={`${style.form_header}`}>Login your accound</h3>
            <form onSubmit={submit}>
              {loginError && (
                <Errorhandel
                  message={loginError}
                  clearError={() => setloginError(undefined)}
                />
              )}
            
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email address"
                  name="email"
                  required
                  onChange={(e) => setemail(e.target.value)}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            
              <button className={`${style.login_btn}`} type="submit">
                Login
              </button>
              <p className="pt-4 pb-2  ">
                Dont't have an accound?
                <strong
                  onClick={handel_signin}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    paddingLeft: "5px",
                  }}
                >
                  Signin
                </strong>
              </p>
            </form>
          </div>

          {/* media queary screen */}
    </>
  );
}

export default Login;

