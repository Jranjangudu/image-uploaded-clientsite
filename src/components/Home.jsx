import React from "react";
import Upload from "./Layout/Upload"
import Header from "./Header";
function Home() {
  return (
    <div className="container-field">
         <Header/>
        <div className="container">
         <Upload/>
    </div>
    </div>
  );
}

export default Home;
