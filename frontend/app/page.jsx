"use client";
import { useState } from "react";

const LotteryComponent = () => {
  const [name, setName] = useState("");
  const [lotteryStatus, setLotteryStatus] = useState("");
  const [winner, setWinner] = useState("");
  const [verifyStatus, setVerifyStatus] = useState("");
  const [namesList, setNamesList] = useState([]);

  const handleAddName = async () => {
    try {
      const response = await fetch("http://localhost:8080/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });

      if (response.ok) {
        setLotteryStatus("Name added successfully!");
        setNamesList((prev) => [...prev, name]);
      } else {
        setLotteryStatus("Failed to add name.");
      }
    } catch (error) {
      console.error(error);
      setLotteryStatus("Error adding name.");
    }
  };

  const handleStartLottery = async () => {
    setLotteryStatus("Requesting lottery start...");
    try {
      const response = await fetch("http://localhost:8080/start_lottery", {
        method: "POST",
      });

      if (response.ok) {
        setLotteryStatus("Lottery started!");
      } else {
        setLotteryStatus("Failed to start lottery.");
      }
    } catch (error) {
      console.error(error);
      setLotteryStatus("Error starting lottery.");
    }
  };

  const handleAnnounceWinner = async () => {
    try {
      const response = await fetch("http://localhost:8080/announce_winner", {
        method: "GET",
      });

      if (response.ok) {
        const winnerData = await response.json();
        setWinner(winnerData);
      } else {
        setWinner("No winner yet.");
      }
    } catch (error) {
      console.error(error);
      setWinner("Error announcing winner.");
    }
  };

  const handleVerifyName = async () => {
    try {
      const response = await fetch("http://localhost:8080/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });

      if (response.ok) {
        setVerifyStatus("Name is in the lottery!");
      } else {
        setVerifyStatus("Name not found in the lottery.");
      }
    } catch (error) {
      console.error(error);
      setVerifyStatus("Error verifying name.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Lottery System</h1>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border px-2 py-1 text-black"
        />
      </div>

      <button
        onClick={handleAddName}
        className="mr-2 px-4 py-2 bg-blue-500 text-white"
      >
        Add Name
      </button>
      <button
        onClick={handleStartLottery}
        className="mr-2 px-4 py-2 bg-green-500 text-white"
      >
        Start Lottery
      </button>
      <button
        onClick={handleAnnounceWinner}
        className="mr-2 px-4 py-2 bg-yellow-500 text-white"
      >
        Announce Winner
      </button>
      <button
        onClick={handleVerifyName}
        className="px-4 py-2 bg-red-500 text-white"
      >
        Verify Name
      </button>

      <div className="mt-4">
        <p>Status: {lotteryStatus}</p>
        <p>Verify Status: {verifyStatus}</p>
        <p>Winner: {winner}</p>
      </div>

      <div className="mt-4">
        <h2>Names in the lottery:</h2>
        <ul>
          {namesList.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LotteryComponent;
