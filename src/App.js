import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useEffect, useState } from "react";
import abi from "./contract/coinflip/polygon.json";
import { parseEther } from "viem";

function App() {
  const contractAddress = "0x16a0c09FB0DB20746B93964cf65222aB6a98B3A1";
  const account = useAccount();
  const [value, setValue] = useState();
  const [coinSide, setcoinSide] = useState(true);

  const { data: useContractReadData } = useReadContract({
    abi,
    address: "0x16a0c09FB0DB20746B93964cf65222aB6a98B3A1",
    functionName: "PrintNextGameNo",
    watch: true,
  });

  const { data: hash, isPending, writeContract } = useWriteContract();
  const startGamee = async () => {
    console.log("start game function run ");
    writeContract({
      abi,
      address: "0x16a0c09FB0DB20746B93964cf65222aB6a98B3A1",
      functionName: "StartGame",
      args: [parseEther("0.0001"), false],
      value: parseEther("0.0001"),
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    console.log("__________________________");
    console.log("ReadData", useContractReadData);
    console.log("ReadData", Number(useContractReadData));
    console.log("__________________________");
  }, [useContractReadData, isConfirmed]);

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
        <p>
          Number:{" "}
          {useContractReadData
            ? Number(useContractReadData)
            : "not fetched yet"}
        </p>

        {/* <input
          placeholder="bet on heads or tails"
          type="text"
          onChange={(e) => setcoinSide(e.target.value)}
        /> */}
        {/* <input
          placeholder="ether value"
          type="number"
          onChange={(e) => setValue(e.target.value)}
        /> */}
        <p> value: {value} </p>
        <p> value: {coinSide} </p>
        <button disabled={isPending} onClick={() => startGamee()}>
          {isPending ? "game going on..." : "start game"}
        </button>

        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}


      </div>
    </div>
  );
}

export default App;
