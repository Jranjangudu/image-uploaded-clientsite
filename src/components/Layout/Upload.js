import React, { useState, useContext } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import Usercontext from "../../Context/Usercontext";
import Displayimage from "./Displayimage";
import "./upload.css";
function Upload() {
  const [uploadimage, setuploadimage] = useState("");
  const [comment, setcomment] = useState("");
  const [serverData, setserverData] = useState([]);
  const [state, setstate] = useState();
  const { userData } = useContext(Usercontext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = await new FormData();
      setstate(true);
      // here images pass compulsory , its the name the file
      formData.append("images", uploadimage);
      formData.append("usercomment", comment);
      formData.append("username", userData.userName);
      await axios.post("/api/v1/user/upload", formData);
      const serverRes = await axios.get("/api/v1/user/image/server/");
      setserverData(serverRes);
      setstate(false);
      setcomment("");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePhoto = (e) => {
    setuploadimage(e.target.files[0]);
  };

  return (
    <header>
      <div className="card  mt-2 mb-3 text-center upload_box">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="card-header text-center">
            <input
              type="text"
              className="form-control ml-2"
              name="usercomment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              required
              placeholder="what's on your mind, post here"
            />
            <label htmlFor="files" className="btn btn-dark mt-2">
              <CloudUploadIcon className="text-danger" /> image
            </label>
            <input
              type="submit"
              value="Upload"
              className="btn btn-primary ml-1"
            />{" "}
            <br />
            <small>Image limit 1024 kb</small>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="images"
              onChange={handlePhoto}
              style={{ display: "none" }}
              id="files"
              required
            />
          </div>
        </form>
        {state ? <strong className="loader"> </strong> : null}
      </div>
      <Displayimage serverRes={serverData} />
    </header>
  );
}

export default Upload;
