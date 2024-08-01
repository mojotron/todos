import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type UserType = {
  username: string;
};

const useAuthSource = (): {
  isAuth: boolean;
  updateAuth: (value: boolean) => void;
  user: UserType | null;
} => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<null | UserType>(null);
  console.log("context", isAuth, user);

  // check if token is valid
  useEffect(() => {
    axios
      .get("/user/profile")
      .then((response) => {
        if (response.data.status === "success") {
          setIsAuth(true);
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsAuth(false);
        setUser(null);
      });
  }, [isAuth]);

  const updateAuth = useCallback((value: boolean) => {
    setIsAuth(value);
  }, []);

  return { isAuth, updateAuth, user };
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
