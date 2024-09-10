import { createContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";

// User Interface (contains all user spotify details)
interface User {
  userId: string;
  displayName: string;
  profileImageUrl: string;
  profileUrl: string;
}

// Context state (either we have a user (user logged in) or we have null (no user logged in))
interface AuthState {
  user: User | null;
}

// What actions does our producer take?
interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload: User | null;
}

// Declare our state and dispatch types for context creation
interface AuthContextInterface {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

// Takes current state and an action type to produce a new state
// E.G For LOGIN action, takes current User state (null if no user logged in), then applies Login action (the payload of which is our new user data found in User interface)
// Then returns our new User state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    //IF login, set user to payload (payload is User details)
    case "LOGIN":
      return {
        user: action.payload,
      };
    //IF logout, set user as null
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};
//

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Use our reducer function and set initial state to null
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Check for previous user in localStorage and update user state if user found.
  useEffect(() => {
    if (localStorage.getItem("spProfile")) {
      const user: User = JSON.parse(localStorage.getItem("spProfile")!);

      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  // CHECK: Edge case check for if a users token expires after initially accessing app

  //Listen for location changes (i.e page changes)
  const location = useLocation();
  // If we change URL, check if stsToken has expired. If so, log user out.
  useEffect(() => {
    const timeNow = Math.floor(Date.now() / 1000);
    if (
      localStorage.getItem("stsTokenExpiry") &&
      Number(localStorage.getItem("stsTokenExpiry")) < timeNow
    ) {
      console.log("STS Token expired, logging out");
      localStorage.clear();
      dispatch({ type: "LOGOUT", payload: null });
    }
  }, [location]);

  //Return this context for all children that are wrapped in provider
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
