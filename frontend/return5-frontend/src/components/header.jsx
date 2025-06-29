import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { useEffect, useContext, useRef } from "react";
import { walletContext } from "../App";
import { sepolia } from "thirdweb/chains";
import { client } from "../api/thirdweb"; // your Thirdweb client
import { useNavigate } from "react-router-dom";


export default function Header() {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const { setWallet } = useContext(walletContext);

  const handleLogin = () => {
      navigate("/login");
  };

  useEffect(() => {
    setWallet(account?.address || null);
  }, [account]);

  return (
    <div className="header-area">
      <p className="project-title">BayaniHub</p>
      <div className="navtoolbox">
        <p className="navtools">Courses & Certification</p>
        <p className="navtools">Browse Projects</p>
        <p className="navtools">Wallet</p>
        <button className="login-button"onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
