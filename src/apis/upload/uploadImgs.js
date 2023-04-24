import { API_ROUTES } from "../api_routes";
import axios from "axios";

export const uploadImgs = async (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data", // <-- Set header for
      mode: "no-cors",
    },
  };

  const res = await axios.post(`${process.env.REACT_APP_BASE_API_URL}${API_ROUTES.UPLOAD.IMAGES}`, data, config);
  if(res.status === 200){
  return res.data
  }
  
};
