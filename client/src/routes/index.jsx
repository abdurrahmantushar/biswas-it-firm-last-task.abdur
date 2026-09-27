import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import ClientDashboard from "../pages/client/ClientDasbord";
import ClientProjects from "../pages/client/ClientProjects";
import ClientTasks from "../pages/client/ClientTasks";
import ClientPayments from "../pages/client/ClientPayments";
import ClientFiles from "../pages/client/ClientFiles";
import ClientUpdates from "../pages/client/ClientUpdates";
import ClientSupport from "../pages/client/ClientSupport";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminClients from "../pages/admin/AdminClients";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminTasks from "../pages/admin/AdminTasks";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminUpdates from "../pages/admin/AdminUpdate";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
  path: "/register",
  element: <Register />,
  },

  {
    element: <ProtectedRoute role="client" />,
    children: [
      {
        element: <DashboardLayout role="client" />,
        children: [
          {
            path: "/client",
            element: <ClientDashboard />,
          },
          {
            path: "/client/projects",
            element: <ClientProjects />,
          },
          {
            path: "/client/tasks",
            element: <ClientTasks />,
          },
          {
            path: "/client/payments",
            element: <ClientPayments />,
          },
          {
            path: "/client/files",
            element: <ClientFiles />,
          },
          {
            path: "/client/updates",
            element: <ClientUpdates />,
          },
          {
            path: "/client/support",
            element: <ClientSupport />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        element: <DashboardLayout role="admin" />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/clients",
            element: <AdminClients />,
          },
          {
            path: "/admin/projects",
            element: <AdminProjects />,
          },
          {
            path: "/admin/tasks",
            element: <AdminTasks />,
          },
          {
            path: "/admin/payments",
            element: <AdminPayments />,
          },
          {
            path: "/admin/updates",
            element: <AdminUpdates />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;