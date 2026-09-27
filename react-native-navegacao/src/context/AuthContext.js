import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ session: null, signIn: (session) => {}, signOut: () => {} });

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  return <AuthContext.Provider value={{ session, signIn: setSession, signOut: () => setSession(null) }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
