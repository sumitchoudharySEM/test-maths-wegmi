import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";
import { useAccount } from "wagmi";

function App() {
  const contractAddress =
    "0x056d9b8539c57a9fb3952ff204d8c5e50f5c7a084179eedc5d9ceaf585ed9c2d";
  const account = useAccount();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 12,
      }}
    >
      <ConnectButton />
      <hr />
      <div>
        <h1>WAGMI</h1>
        <p>Account: {account.address}</p>
      </div>
    </div>
  );
}

export default App;
