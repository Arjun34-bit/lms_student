import { getItem } from "../../utils/localStorageUtils";
import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
const token = getItem("token");

export const getAllCourseApi = async () => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/student/course/all-courses`
  );
  return response.data;
};

export const buyCourseApi = async (courseId) => {
  const response = await axiosClient.post(
    `${apiBaseUrl}/student/course/buy-course`,
    {
      courseId: courseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
