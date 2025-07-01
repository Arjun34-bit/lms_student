import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;

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

export const fetchImageApi = async (thumbnailId) => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/common/image?fileId=${thumbnailId}`,
    {
      responseType: "blob",
    }
  );
  console.log(response?.config?.url);
  return response?.config?.url;
};
