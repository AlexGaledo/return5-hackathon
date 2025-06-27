import { Navigate } from "react-router-dom";
import { loginStatusContext } from "../App";
import { useContext } from "react";

export default function RouteLock({ children }) {
    const { loginStatus } = useContext(loginStatusContext);
    console.log("RouteLock loginStatus:", loginStatus); // DEBUG

    return loginStatus? children : <Navigate to="/"/>;
}