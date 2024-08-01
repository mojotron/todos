import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContextProvider from "../contexts/AuthContext";

const MainLayout = () => {
  return (
    <div className="min-h-[100vh] min-w-full flex flex-col bg-gray-800">
      <AuthContextProvider>
        <Header />
        <main className="w-full flex flex-col items-center py-10">
          <Outlet />
        </main>
        <Footer />
      </AuthContextProvider>
    </div>
  );
};

export default MainLayout;
