import { Route, Routes } from "react-router-dom";
import Home from "../views/home";
import DefaultLayout from "../layouts/default";
import ProtectedRoute from "./ProtectedRoutes";
import AuthLayout from "../layouts/auth";
import DashboardLayout from "../layouts/dashboard";
import Login from "../views/auth/login";
import Unauthorized from "../views/unauthorized";
import DashboardHome from "../views/dashboard/home";
import DashboardCategoryIndex from "../views/dashboard/category";
import DashboardCategoryCreate from "../views/dashboard/category/create";
import DashboardCategoryEdit from "../views/dashboard/category/edit";
import DashboardQuestionIndex from "../views/dashboard/question";
import NotFound from "../views/notfound";
import CategoryQuestions from "../views/question";
import Finished from "../views/finished";
export default function AppRoutes(){
    return (
        <Routes>

            <Route element={<ProtectedRoute allowedRoles={["admin", "user"]}/>}>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id/questions" element={<CategoryQuestions />} />
                    <Route path="/category/:id/finished" element={<Finished />} />
                </Route>
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
                <Route element={<DashboardLayout/>}>
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/dashboard/category" element={<DashboardCategoryIndex />} />
                    <Route path="/dashboard/category/create" element={<DashboardCategoryCreate />} />
                    <Route path="/dashboard/category/edit/:id" element={<DashboardCategoryEdit />} />
                    <Route path="/dashboard/question" element={<DashboardQuestionIndex />} />
                </Route>
            </Route>

        </Routes>

    )
}