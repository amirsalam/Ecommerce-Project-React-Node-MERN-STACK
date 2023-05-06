import React from "react";
import { API_URL } from "../config";

const ShowImage = ({ item, url, className }) => {
  return (
    <div>
      <img
        src={`${API_URL}/${url}/${item._id}`}
        className={className}
        alt={`${item.name}`}
      />
    </div>
  );
};

export default ShowImage;
