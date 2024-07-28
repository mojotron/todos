import { ReactNode, createContext, useCallback, useState } from "react";

const useAuthSource = (): {
  accessToken: null | string;
  addToken: (token: string) => void;
  removeToken: () => void;
} => {
  const [accessToken, setAccessToken] = useState<null | string>(null);

  // check if token is valid
  // try to refresh token

  const addToken = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  const removeToken = useCallback(() => {}, []);

  return { accessToken, addToken, removeToken };
};

export const AuthContext = createContext<ReturnType<typeof useAuthSource>>(
  {} as unknown as ReturnType<typeof useAuthSource>
);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={useAuthSource()}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
