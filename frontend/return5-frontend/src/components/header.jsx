import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { useEffect, useContext, useRef } from "react";
import { loginStatusContext, walletContext } from "../App";
import { sepolia } from "thirdweb/chains";
import { client } from "../api/thirdweb"; // your Thirdweb client
import { useNavigate } from "react-router-dom";
import techtopiapink from "../assets/techtopia-pink.jpg"
import techtopiadark from "../assets/techtopia-dark.jpg"


export default function Header() {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const { setWallet } = useContext(walletContext);
  const { loginStatus } = useContext(loginStatusContext);

  const handleLogin = () => {
      navigate("/login");
  };

  const browseProjects = () =>{
    navigate("/browse-projects");
  }

  const handleDashboard = () =>{
      navigate("/home")
  }

  useEffect(() => {
    setWallet(account?.address || null);
  }, [account]);

  return (
    <div className="header-area">
      <img
          src={techtopiadark}
          alt="TechTopia"
          className="project-title"
        />
      <div className="navtoolbox">
        <p className="navtools">Courses & Certification</p>
        <p className="navtools" onClick={browseProjects}>Browse Projects</p>
        <p className="navtools">Wallet</p>
        <button className="login-button"onClick={!loginStatus?handleLogin:handleDashboard}>{!loginStatus?`Login`:`Dashboard`}</button>
      </div>
    </div>
  );
}
