import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContextProvider from "../contexts/AuthContext";

const MainLayout = () => {
  return (
    <AuthContextProvider>
      <div className="min-w-full min-h-[100vh] flex flex-col bg-gray-800">
        <Header />
        <main className="h-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default MainLayout;
