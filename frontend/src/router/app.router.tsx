import AuthPage from "../pages/home/AuthPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Register from "../pages/home/RegisterPage";
import Rules from '../pages/home/RulesPage'
import ProfilePage from '../pages/profile/ProfilePage'
import PrivateRoute from './PrivateRoute'
import { AdminLayout } from "../components/AdminLayout/AdminLayout";
import { UserTable } from "../components/UserTable/UserTable";
import { ThemeTable } from "../components/ThemeTable/ThemeTable";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/auth",
    element: <AuthPage></AuthPage>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
        path: 'rules',
        element: <Rules></Rules>
    },
    {
        path:'/profile',
        element: 
        <PrivateRoute>
            <ProfilePage></ProfilePage>
        </PrivateRoute>
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="usuarios" replace /> },
          { path: "usuarios", element: <UserTable /> },
          { path: "tematicas", element: <ThemeTable /> },
        ],
  },
])
