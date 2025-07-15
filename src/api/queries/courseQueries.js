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

export const getEnrolledCourse = async () => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/student/enrolled-course`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getCourseByIdApi = async (id, limit = 10, pageNumber = 1) => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/student/course/course-detail`,
    {
      params: {
        courseId: id,
        limit,
        pageNumber,
      },
    }
  );
  return response;
};

export const getCourseByCategoryApi = async (
  id,
  limit = 10,
  pageNumber = 1
) => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/student/course/by-category`,
    {
      params: {
        categoryId: id,
        limit,
        pageNumber,
      },
    }
  );
  return response;
};
