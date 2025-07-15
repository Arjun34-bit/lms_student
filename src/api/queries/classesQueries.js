import { getItem } from "../../utils/localStorageUtils";
import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
const token = getItem("token");

export const getAllLiveClasses = async () => {
  try {
    const response = await axiosClient.get(
      `${apiBaseUrl}/student/live-classes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
