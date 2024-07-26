import AuthNavbar from "./AuthNavbar";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-gray-900 px-4 py-2 flex items-center justify-between">
      <Logo />
      <AuthNavbar />
    </header>
  );
};

export default Header;
