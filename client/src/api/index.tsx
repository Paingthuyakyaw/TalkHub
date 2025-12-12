import Axios from "axios";
import { useBoundStore } from "../store/client/use-store";

export const axios = Axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const fetchVerfiy = async (token: string) => {
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

export const authJsonToken = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${useBoundStore.getState().token}`,
});
