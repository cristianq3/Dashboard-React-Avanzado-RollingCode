import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children, user}) => {
    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    if(userInfo.role === "Administrador"){
        return children
    }else if(userInfo.role === "Cliente") {
        return <Navigate to={"/*"}></Navigate>
    } else{
        return <Navigate to={"/login"}></Navigate>
    }
}

export default ProtectedRoutes;