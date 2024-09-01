import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
// Layout
import MainLayout from "./layouts/MainLayout";
// Pages
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
// components
import ProtectedRoutes from "./components/ProtectedRoutes";
import TaskContextProvider from "./contexts/TaskContext";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <TaskContextProvider>
              <Dashboard />
            </TaskContextProvider>
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
