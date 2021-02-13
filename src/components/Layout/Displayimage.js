import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import style from "./Displayimage.module.css";
function Displayimage(props) {
  const [serverData, setserverData] = useState([]);

  let history = useHistory();

  useEffect(() => {
    try {
      const getuserimage = async () => {
        try {
          const serverRes = await axios.get("/api/v1/user/image/server/");
          setserverData(serverRes.data);
        } catch (error) {
          console.log(error);
        }
      };
      getuserimage();
    } catch (error) {
      console.log(error);
    }
  }, [props.serverRes, setserverData]);

  const handellike = async (id) => {
    await axios.post(`/api/v1/user/likes/${id}`);
    // get like data
    const serverRes = await axios.get("/api/v1/user/image/server/");

    setserverData(serverRes.data);
  };
  let deleteimage = async (id) => {
    await axios.delete(`/api/v1/user/delete/image/${id}`);

    history.push("/accessusers");
  };

  return (
    <div className="container">
      <div className="row">
        {serverData.length === 0 ? (
          <p>loading..</p>
        ) : (
          serverData.map((images) => {
            return (
              <div className="col-md-4 mt-4" key={images._id}>
                <div className={`${style.card_group} card-group`}>
                  <div className="card ">
                    <img
                      src={images.uploadimages}
                      className="card-img-top"
                      alt="..."
                    />
                    <div
                      className="card-body "
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      <div className="socialmedia_row d-flex ">
                        <p>
                          {
                            <IconButton
                              className="text-white"
                              onClick={() => handellike(images._id)}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Like"
                            >
                              <FavoriteBorderIcon />
                            </IconButton>
                          }
                        </p>
                        <p>
                          {
                            <IconButton className="text-white">
                              <SendIcon />
                            </IconButton>
                          }
                        </p>
                        <p>
                          {
                            <IconButton
                              className={`${style.deletebtn} text-white`}
                              onClick={() => deleteimage(images._id)}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Delete"
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          }
                        </p>
                        <p className="ml-auto">
                          {
                            <IconButton className="text-white">
                              <BookmarkBorderIcon />
                            </IconButton>
                          }
                        </p>
                      </div>
                      <div className={`${style.image_footer}`}>
                        <small style={{ position: "relative", top: "-18px" }}>
                          {images.likes} likes
                        </small>
                        <br />
                        <div className={`${style.comment_area}`}>
                          <small>
                            <strong>{images.name} :- </strong>
                            {images.comments}
                          </small>
                          <br />
                          <small style={{ fontSize: "10px" }}>
                            {new Date(images.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Displayimage;
