import Button from "../ui/Button";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <div>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </div>
  );
};

export default AuthNavbar;
