import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import abi from "./contract/coinflip/polygon.json";
import { parseEther } from 'viem';

function App() {
  const contractAddress = "0x16a0c09FB0DB20746B93964cf65222aB6a98B3A1";
  const account = useAccount();
  const [value, setValue] = useState();

  const { data: useContractReadData } = useReadContract({
    abi,
    address: "0x16a0c09FB0DB20746B93964cf65222aB6a98B3A1",
    functionName: "PrintNextGameNo",
    watch: true,
  });

  const { writeContract } = useWriteContract();

  const setNumber = async () => {
    writeContract({
      abi,
      address: "0x5E4d3C33Cd36E4e42E7Cd961b7C3d2906D2F72ba",
      functionName: "changeNumber",
      args: [value],
      value: parseEther('0.0001'),
    });
  };

  useEffect(() => {
    console.log("__________________________");
    console.log("ReadData", useContractReadData);
    console.log("ReadData", Number(useContractReadData));
    console.log("__________________________");
  }, [useContractReadData]);

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

        <input
          name="value"
          placeholder="Value"
          type="number"
          required
          onChange={(e) => setValue(e.target.value)}
        />
        <p> value: {value} </p>
        <button onClick={() => setNumber()}>Change Number</button>

      </div>
    </div>
  );
}

export default App;
