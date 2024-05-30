import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) throw new Error("Context is used outside.");
  return context;
}
