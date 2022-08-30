import axios from "axios";

const getS3Link = async (e) => {
  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    let formData = new FormData();
    const img = e.target.files[0];
    formData.append("image", img);
    const image = await axios.post(`${BASE_URL}/upload-image`, formData);
    return image.data;
  } catch (err) {
    return err;
  }
};

export default getS3Link;
