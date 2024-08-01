import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
// Layout
import MainLayout from "./layouts/MainLayout";
// Pages
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// components
import ProtectedRoutes from "./components/ProtectedRoutes";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <h1>home</h1> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
