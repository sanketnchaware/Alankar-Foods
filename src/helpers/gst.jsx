import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("alankartoken");
const gstcall = async () => {
    try {
      const gst = await axios.get(`${BASE_URL}/admin/gst`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
     return (gst.data);
    } catch (err) {
      console.log(err);
    }
  };

  export default gstcall;