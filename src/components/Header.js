import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../Asserts/Network.png";
import Usercontext from "../Context/Usercontext";
import "./header.css";
function Header() {
  const history = useHistory();
  const { userData } = useContext(Usercontext);
  const handellogout = () => {
    window.localStorage.removeItem("auth-token");
    history.push("/login");
  };
  return (
    <div
      className="search__bar"
      style={{
        display: "flex",

        position: "sticky",
        top: "-1px",
        backgroundColor: "#000000",
        zIndex: "10",
      }}
    >
      <img src={logo} alt="logo" width="200px" className="logo" />
      <div className="ml-auto pt-2 d-flex aligh-center">
        <img
          src={`https://avatars.dicebear.com/4.5/api/avataaars/${userData.userID}fsdffgfdfc.svg`}
          alt=".."
          width="30px"
        />{" "}
        <h5 className=" text-white pt-2 user_name">{userData.userName}</h5>
      </div>
      <button
        className="btn btn-danger ml-auto mr-3 "
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Logout"
        onClick={handellogout}
      >
        <ExitToAppIcon className="exit_btn" />
      </button>
    </div>
  );
}

export default Header;
