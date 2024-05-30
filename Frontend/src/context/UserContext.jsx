import { createContext, useState, useContext, useEffect } from "react";
import { isValidJSON } from "../utils/isLogin";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && isValidJSON(storedToken)
      ? JSON.parse(storedToken)
      : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) setToken(null);
    if (storedToken && isValidJSON(storedToken))
      setToken(JSON.parse(storedToken));
    else {
      setToken(null);
    }
  }, []);

  function handelSetToken(JWTtoken) {
    setToken(JWTtoken);
    if (JWTtoken === null) {
      return localStorage.removeItem("token");
    }
    localStorage.setItem("token", JSON.stringify(JWTtoken));
  }
  return (
    <UserContext.Provider value={{ token, handelSetToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) throw new Error("Context is used outside.");
  return context;
}
