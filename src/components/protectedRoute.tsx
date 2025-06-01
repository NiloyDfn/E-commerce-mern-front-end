import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?:ReactElement;
    isAuthenticated:boolean;
    adminOnly?:boolean;
    Admin?:boolean;
    redirect? : string;
}

const ProtectedRoute = ({children,isAuthenticated,adminOnly,Admin,redirect="/"}:Props) => {

    if(!isAuthenticated) return <Navigate to={redirect}/>;

    if(adminOnly && !Admin) return <Navigate to={redirect}/>;
    
    

    return children ? children : <Outlet/>
    
};

export default ProtectedRoute;
