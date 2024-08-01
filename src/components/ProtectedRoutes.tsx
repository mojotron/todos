import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();

  console.log("protected", isAuth, user);

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoutes;
