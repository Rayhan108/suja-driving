
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/feature/auth/authSlice";


const PrivetRoutes = ({children}) => {
const user = useAppSelector(selectCurrentUser)
    const location = useLocation();

    if(user){
       return children;
    }
    return <Navigate to="/sign-in" state={{from:location}} replace></Navigate>
};

export default PrivetRoutes;