import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <main className="min-h-[100vh] min-w-full flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
