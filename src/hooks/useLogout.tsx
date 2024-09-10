import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT", payload: null });
  };

  return { logout };
};
