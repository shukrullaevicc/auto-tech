import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import Dashboard from "../dashboard/Dashboard";

const Private = () => {
   const auth = useSelector(state => state);

  return auth.token ? <Dashboard /> : <Navigate to="/auth" />
}

export default Private