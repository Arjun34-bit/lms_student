import { getItem } from "../../utils/localStorageUtils";
import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
const token = getItem("token");

export const getEnrolledCourseById = async (id) => {
  try {
    const data = await axiosClient.get(
      `${apiBaseUrl}/student/enrolled-course/single`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      {
        courseId: id,
      }
    );
    return data?.data?.data;
  } catch (error) {
    console.log(error);
    throw new Error("Course Fetching Failed");
  }
};
