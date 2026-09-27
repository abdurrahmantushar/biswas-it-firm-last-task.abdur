import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;