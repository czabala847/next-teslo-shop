import { useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

import { AuthContext, authReducer } from ".";
import { IUser } from "@/interfaces";
import { tesloApi } from "@/api";
import axios from "axios";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();

  //Sin next auth
  const checkToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.get("/user/validate-jwt");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      console.error("Error loginUser", error);

      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });

      return { hasError: false };
    } catch (error) {
      console.error("Error registerUser", error);
      if (axios.isAxiosError(error)) {
        return { hasError: true, message: error.response?.data.message };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    Cookies.remove("cart");
    Cookies.remove("addressData");

    //con next auth
    signOut();

    //Sin next auth
    // Cookies.remove("token");
    // router.reload();
  };

  //Sin next auth
  // useEffect(() => {
  //   checkToken();
  // }, []);

  //Con next auth
  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data.user as IUser });
    }
  }, [data, status]);

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
