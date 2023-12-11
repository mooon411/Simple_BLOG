import axios from "axios";
import React from "react";

const Image = (props) => {
  const FileUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios.post("/api/post/image/upload", formData).then((response) => {
      console.log(response);
      props.setImage(response.data.filePath);
    });
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => FileUpload(e)} />
    </div>
  );
};

export default Image;
