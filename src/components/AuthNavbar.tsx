import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

const AuthNavbar = () => {
  const { user } = useAuth();
  const { logoutUser } = useLogout();

  return (
    <div>
      {user ? (
        <>
          <Link to="/dashboard">
            <Button>{user.username} dashboard</Button>
          </Link>
          <Button clickHandler={logoutUser}>Logout</Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthNavbar;
