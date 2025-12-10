import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const fetchVerfiy = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(`me`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err, "verify");
  }
};
