import { getItem } from "../../utils/localStorageUtils";
import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
const token = getItem("token");

export const authLoginApi = async ({ email, password }) => {
  const { data } = await axiosClient.post(
    `${apiBaseUrl}/student/auth/login-with-email`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const authRegisterApi = async ({ name, email, password }) => {
  const { data } = await axiosClient.post(
    `${apiBaseUrl}/student/auth/signup-with-email`,
    {
      name,
      email,
      password,
    }
  );
  return data;
};

export const googleSigninApi = async (idToken) => {
  const { data } = await axiosClient.post(
    "/student/auth/google-login",
    {
      idToken,
    },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const authLoginWithPhoneApi = async (idToken) => {
  const response = await axiosClient.post(
    `${apiBaseUrl}/student/auth/login-with-phone-number`,
    {
      idToken,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getAllCourseApi = async () => {
  const response = await axiosClient.get(
    `${apiBaseUrl}/student/course/all-courses`
  );
  return response.data;
};

export const updateUserProfileApi = async (data) => {
  const response = await axiosClient.patch(
    `${apiBaseUrl}/student/user/update-profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getUserProfileApi = async () => {
  const response = await axiosClient.get(`${apiBaseUrl}/student/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const userLogout = async () => {
  try {
    const data = await axiosClient.post(
      `${apiBaseUrl}/student/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return { message: data?.message };
  } catch (error) {
    console.log(error);
    throw new Error("Logout failed");
  }
};
