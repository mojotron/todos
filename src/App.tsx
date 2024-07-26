import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
// Layout
import MainLayout from "./layouts/MainLayout";
// Pages
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <h1>dashboard</h1> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
