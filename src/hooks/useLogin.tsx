import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const login = async () => {
    const authUrl = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {})
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        setError(error);
        console.error("Error handling login: ", error);
      });
    // Have to use setTimeout here because Safari is awful and blocks window.open in async functions:
    // https://stackoverflow.com/questions/74128322/using-window-open-in-an-async-function-in-firefox-and-safari
    setTimeout(() => {
      const loginWindow = window.open(
        authUrl["authUrl"],
        "_blank",
        "height=500,width=600",
      );
          
      // Check every half a second whether the redirect window has closed itself.
      // Once it has, dispatch login event to context.
      const timer = setInterval(() => {
        if (loginWindow?.closed) {
          clearInterval(timer);
          
          // send login event and user info to AuthContext so it can be updated App wide
          dispatch({
            type: "LOGIN",
            payload: JSON.parse(localStorage.getItem("spProfile")!),
          });
        }
      }, 500);
    });
  };
  return { login, error };
};