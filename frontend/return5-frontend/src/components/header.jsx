import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { useEffect, useContext } from "react";
import { walletContext } from "../App";
import { sepolia } from "thirdweb/chains";
import { client } from "../api/thirdweb"; // your Thirdweb client



export default function Header() {
  const account = useActiveAccount();
  const { setWallet } = useContext(walletContext);

  useEffect(() => {
    setWallet(account?.address || null);
  }, [account]);

  return (
    <div className="header-area">
      <div className="navtoolbox">
        <h1 className="navtools">|About|</h1>
        <h1 className="navtools">|Home|</h1>
        <h1 className="navtools">|Projects|</h1>

        <ConnectButton
          client={client}
          chain={sepolia}
          appMetadata={{
            name: "Return5",
            url: "http://localhost:5173",
          }}

        />
      </div>
    </div>
  );
}
