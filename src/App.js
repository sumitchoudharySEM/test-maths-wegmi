import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import abi from "./contract/abi.json";

function App() {

  const contractAddress =
    "0x1705Be686E606FF75Aa4C2F636Cbd8D5f7956b59";
  const account = useAccount();

  // const {data} = useReadContract({
  //   contractABI,
  //   address: contractAddress,
  //   functionName: 'getNumber',
  // });
  const { data :useContractReadData } = useReadContract({
    abi,
    address: '0x1705Be686E606FF75Aa4C2F636Cbd8D5f7956b59',
    functionName: 'getNumber',
    watch: true,
  })

  useEffect(() => {
    
  }, []);

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
        <p>Number: {useContractReadData? Number(useContractReadData) : "not fetched yet"}</p>
      </div>
    </div>
  );
}

export default App;
