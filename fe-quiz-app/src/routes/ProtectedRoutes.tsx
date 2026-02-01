import { Navigate, Outlet } from "react-router-dom"
import { getAuth } from "./auth/auth"

type Props = {
  allowedRoles: string[]
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { token, role } = getAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(role || "")) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
