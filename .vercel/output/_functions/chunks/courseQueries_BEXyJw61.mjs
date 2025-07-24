import { g as getItem } from './localStorageUtils_xJkj8yAm.mjs';
import { a as api } from './client_DCbe-m4L.mjs';

const apiBaseUrl$1 = undefined                                   ;
const token$1 = getItem("token");
const fetchDepartmentsApi = async () => {
  const { data } = await api.get(`/common/departments`);
  return data;
};
const fetchSubjectsApi = async ({ departmentId }) => {
  const { data } = await api.get(
    `/common/subjects?` + departmentId || ""
  );
  return data;
};
const fetchAllCategoriesApi = async () => {
  const { data } = await api.get(`${apiBaseUrl$1}/common/categories`);
  return data;
};
const fetchImageApi = async (thumbnailId) => {
  const response = await api.get(
    `${apiBaseUrl$1}/common/image?fileId=${thumbnailId}`,
    {
      responseType: "blob"
    }
  );
  return response?.config?.url;
};
const buyCourseApi = async (courseId) => {
  const response = await api.post(
    `${apiBaseUrl$1}/common/buy-course`,
    {
      courseId
    },
    {
      headers: {
        Authorization: `Bearer ${token$1}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};

const apiBaseUrl = undefined                                   ;
const token = getItem("token");
const getAllCourseApi = async () => {
  const response = await api.get(
    `${apiBaseUrl}/student/course/all-courses`
  );
  return response.data;
};
const getEnrolledCourse = async () => {
  const response = await api.get(
    `${apiBaseUrl}/student/enrolled-course`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};
const getCourseByIdApi = async (id, limit = 10, pageNumber = 1) => {
  const response = await api.get(
    `${apiBaseUrl}/student/course/course-detail`,
    {
      params: {
        courseId: id,
        limit,
        pageNumber
      }
    }
  );
  return response;
};
const getCourseByCategoryApi = async (id, limit = 10, pageNumber = 1) => {
  const response = await api.get(
    `${apiBaseUrl}/student/course/by-category`,
    {
      params: {
        categoryId: id,
        limit,
        pageNumber
      }
    }
  );
  return response;
};

export { getCourseByIdApi as a, fetchImageApi as b, fetchSubjectsApi as c, fetchAllCategoriesApi as d, getAllCourseApi as e, fetchDepartmentsApi as f, getEnrolledCourse as g, getCourseByCategoryApi as h, buyCourseApi as i };
