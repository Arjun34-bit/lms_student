import { g as getItem } from './localStorageUtils_xJkj8yAm.mjs';
import { a as api } from './client_DCbe-m4L.mjs';

const apiBaseUrl = undefined                                   ;
const token = getItem("token");
const authLoginApi = async ({ email, password }) => {
  const { data } = await api.post(
    `${apiBaseUrl}/student/auth/login-with-email`,
    {
      email,
      password
    },
    {
      withCredentials: true
    }
  );
  return data;
};
const authRegisterApi = async ({ name, email, password }) => {
  const { data } = await api.post(
    `${apiBaseUrl}/student/auth/signup-with-email`,
    {
      name,
      email,
      password
    }
  );
  return data;
};
const googleSigninApi = async (idToken) => {
  const { data } = await api.post(
    "/student/auth/google-login",
    {
      idToken
    },
    {
      withCredentials: true
    }
  );
  return data;
};
const authLoginWithPhoneApi = async (idToken) => {
  const response = await api.post(
    `${apiBaseUrl}/student/auth/login-with-phone-number`,
    {
      idToken
    },
    {
      withCredentials: true
    }
  );
  return response.data;
};
const updateUserProfileApi = async (data) => {
  const response = await api.patch(
    `${apiBaseUrl}/student/user/update-profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};
const getUserProfileApi = async () => {
  const response = await api.get(`${apiBaseUrl}/student/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

export { authLoginWithPhoneApi as a, authRegisterApi as b, googleSigninApi as c, authLoginApi as d, getUserProfileApi as g, updateUserProfileApi as u };
