import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-[100vh] min-w-full flex flex-col bg-gray-800">
      <Header />
      <main className="flex flex-col items-center py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
