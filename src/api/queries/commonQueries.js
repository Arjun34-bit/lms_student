import { getItem } from "../../utils/localStorageUtils";
import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
const token = getItem("token");

export const fetchDepartmentsApi = async () => {
  const { data } = await axiosClient.get(`/common/departments`);
  return data;
};

export const fetchAllMasterDataApi = async () => {
  const { data } = await axiosClient.get(`/common/master-data`);
  return data;
};

export const fetchSubjectsApi = async ({ departmentId }) => {
  const { data } = await axiosClient.get(
    `/common/subjects?` + departmentId || ""
  );
  return data;
};

export const fetchAllCategoriesApi = async () => {
  const { data } = await axiosClient.get(`${apiBaseUrl}/common/categories`);
  return data;
};

export const fetchImageApi = async (thumbnailId) => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/common/image?fileId=${thumbnailId}`,
    {
      responseType: "blob",
    }
  );
  return response?.config?.url;
};

export const buyCourseApi = async (courseId) => {
  const response = await axiosClient.post(
    `${apiBaseUrl}/common/buy-course`,
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
