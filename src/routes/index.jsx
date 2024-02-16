//public
import Login from "../pages/Auth/Login";

//protected
import Dashboard from "../pages/Dashboard/Dashboard";


const AuthProtectedRoutes = [
    {path: '/' ,component: <Dashboard/>}
]
const PublicRoutes = [
    {path: '/login' , component: <Login/>},
    // {path: '/signup' ,component: <Signup/>}
]

export {AuthProtectedRoutes, PublicRoutes};