import { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });
  const [user, setUser] = useState("");
  const logout = async () => {
    await SecureStore.deleteItemAsync("tokens")
      .then(() => {
        console.log("Item removed successfully");
      })
      .catch((error) => {
        console.log("Error removing item: ", error);
      });
    await SecureStore.deleteItemAsync("user").catch((error) => {
      console.log("Error removing item: ", error);
    });
    setUser("");
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };
  const getAccessToken = () => {
    return authState.accessToken;
  };
  const context = {
    authState,
    setAuthState,
    logout,
    getAccessToken,
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
