import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoutes;
