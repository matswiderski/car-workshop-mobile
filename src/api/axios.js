import { createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const url = "http://192.168.1.100:45455/api";

const AxiosContext = createContext();
export const useAxios = () => {
  return useContext(AxiosContext);
};

export const AxiosContextProvider = ({ children }) => {
  const { authState, setAuthState, logout } = useAuth();
  const authInstance = axios.create({
    withCredentials: true,
    baseURL: url,
  });

  const privateInstance = axios.create({
    withCredentials: true,
    baseURL: url,
  });
  const context = {
    authInstance,
    privateInstance,
  };

  privateInstance.interceptors.request.use(async (request) => {
    try {
      let tokentExpired = dayjs
        .unix(jwt_decode(authState.accessToken).exp)
        .isBefore(dayjs());
      if (!tokentExpired) {
        request.headers.Authorization = `Bearer ${authState.accessToken}`;
        return request;
      }
      const response = await authInstance({
        method: "POST",
        withCredentials: true,
        data: authState.accessToken,
        url: `${url}/auth/refresh-token`,
        headers: {
          "Content-Type": "application/json",
          Cookie: "x-refresh-token=" + authState.refreshToken,
        },
      });
      setAuthState({
        accessToken: response.data.token,
        refreshToken: authState.refreshToken,
        authenticated: true,
      });
      await SecureStore.setItemAsync(
        "tokens",
        JSON.stringify({
          accessToken: response.data.token,
          refreshToken: authState.refreshToken,
          authenticated: true,
        })
      );
      request.headers.Authorization = `Bearer ${response.data.token}`;
    } catch (error) {
      console.log(error);
      logout();
    }
    return request;
  });
  return (
    <AxiosContext.Provider value={context}>{children}</AxiosContext.Provider>
  );
};
