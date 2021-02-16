import React, { useState, useContext } from "react";
import axios from "axios";
import Usercontext from "../Context/Usercontext";
import { useHistory } from "react-router-dom";
import style from "./Register.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import network from "../Asserts/Network.png";
import validator from "validator";
import Errorhandel from '../Errorhandel'
import backgroundimage from "../Asserts/backgroundimage.png";
function Register() {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [Error,setError]=useState()
  const histroy = useHistory();
  const handel_login = () => {
    histroy.push("/login");
  };
  const { setuserData } = useContext(Usercontext);
  const handelsubmit = async (e) => {
    e.preventDefault();
   try {
     
    await axios.post("https://mern-image-upload.herokuapp.com/api/v1/user/post/data/", {
      name: name,
      email: email,
      password: password,
      confirmpassword:confirmpassword
    });

    const userRes = await axios.post(
      "https://mern-image-upload.herokuapp.com/api/v1/user/login",
      {
        email,
        password,
      }
    );
console.log(userRes);
 
    setuserData({
      token: userRes.data.token,
      userName: userRes.data.user.name,
      userEmail:userRes.data.user.email
    });
   window.localStorage.setItem("auth-token", userRes.data.token);
    histroy.push("/accessuser/*");
   } catch (error) {
    // serError(error.Response.msg)
    // to log the (arror.response ) to see your data in the console, the error send a response from backend
    error.response.data.msg && setError( error.response.data.msg)

   }
     
  };
  const handelpassword = (e) => {
    setpassword(e.target.value);
    if (
      validator.isStrongPassword(e.target.value, {
        minLength: 5,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };
  return (
    <>
      <header className={`${style.header}`}>
      <div className="row">
        <div className={`col-sm-6 ${style.leftside_container}`}>
        <img
              src={backgroundimage}
              className="img-fluid"
              alt="backgroundimage"
          
            />
        </div>

        <div className="col-md-4 ml-5" style={{height:"auto"}}>
        <img
              src={network}
              alt="sad network"
              className="my-3"
              width="200px"
            />

        {Error && <Errorhandel message={Error} clearError={() => setError(undefined)}/>}
          <form onSubmit={handelsubmit}>
      
          <h3 className="py-2" style={{textShadow:"2px 3px 3px rgb(180, 192, 192)"}}><strong>Create an accound</strong></h3>
            <div className="mb-3 mt-4">
                <label className="form-label">
                  <b>FullName</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
               placeholder="Enter your fullname"
                  onChange={(e) => setname(e.target.value)}
                 
                />
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label">
                  <b>Email Address</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                 placeholder="Enter your email address"
                  onChange={(e) => setemail(e.target.value)}
                  aria-describedby="emailHelp"
                />
              </div>
            
              <div className="mb-3 mt-4">
                <label className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                placeholder="Enter password"
                  onChange={handelpassword}
               
                />
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label">
                  <b>Confirm password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                placeholder="Enter confirmpassword"
                  onChange={(e) => setconfirmpassword(e.target.value)}
                
                />
              </div>
              <p
              span
              style={{
                fontWeight: "bold",
                color: "red",
                paddingLeft: "5px",
                fontSize: "15px",
              }}
            >
              {errorMessage}
            </p>
            <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  

I accept the Privacy Policy and the Terms of Service
                </label>
              </div>

            <button className={`${style.signin_btn}`} type="submit">
                Signin
              </button>
              <p className="pt-3 pl-2">
              Have an accound?
              <strong onClick={handel_login} className={`${style.loginbtn}`}>
                Login
              </strong>
            </p>
            <p style={{ fontSize: "15px" ,paddingBottom:"10px"}}>
              We'll never share your email with anyone else.
            </p>



          </form>
        </div>

      </div>


      </header>

      {/* media queary screen */}
      <div className={`${style.responsive_screen} `}>
        <p className={`${style.p}`}></p>
          <img
              src={network}
              alt="sad network"
              className="my-2"
              width="200px"
            />
             
          <h3 className={`py-2 ${style.h3}`} style={{textShadow:"2px 3px 3px rgb(180, 192, 192)"}}>Create an accound</h3>
            {Error && <Errorhandel message={Error} clearError={() => setError(undefined)}/>}
              <form onSubmit={handelsubmit}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  <b>FullName</b>
                </label>
                <input
                  type="text"
                  id="exampleInputEmail1" 
                  className="form-control"
                  name="name"
               placeholder="Enter your fullname"
                  onChange={(e) => setname(e.target.value)}
                 
                />
              </div>
              <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                 <b> Email address</b>
                </label>
                <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                 placeholder="Enter your email address"
                  onChange={(e) => setemail(e.target.value)}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 ">
              <label for="exampleInputPassword1" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  placeholder="Enter password"
                    onChange={handelpassword}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <b>Confirm password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                placeholder="Enter confirmpassword"
                  onChange={(e) => setconfirmpassword(e.target.value)}
                
                />
              </div>
              <p
              span
              style={{
                fontWeight: "bold",
                color: "red",
                paddingLeft: "5px",
                fontSize: "15px",
              }}
            >
              {errorMessage}
            </p> 

              <button className={`${style.signin_btn}`} type="submit">
                Signin
              </button>
              <p className="pt-3 pl-2">
              Have an accound?
              <strong onClick={handel_login} className={`${style.loginbtn}`}>
                Login
              </strong>
            </p>
            <p style={{ fontSize: "15px" ,paddingBottom:"10px"}}>
              We'll never share your email with anyone else.
            </p>

            </form>
          </div>

          {/* media queary screen */}
    
    </>
  );
}

export default Register;
