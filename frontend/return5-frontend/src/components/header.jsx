import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { useEffect, useContext, useRef } from "react";
import { walletContext } from "../App";
import { sepolia } from "thirdweb/chains";
import { client } from "../api/thirdweb"; // your Thirdweb client


export default function Header() {
  const account = useActiveAccount();
  const { setWallet } = useContext(walletContext);

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click(); // simulate click
    }
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
        <button className="login-button">Login</button>
      </div>
    </div>
  );
}
