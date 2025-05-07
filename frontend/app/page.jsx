"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 p-4 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Lottery System</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="mb-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleAddName}>Add Name</Button>
            <Button onClick={handleStartLottery}>Start Lottery</Button>
            <Button onClick={handleAnnounceWinner}>Announce Winner</Button>
            <Button onClick={handleVerifyName}>Verify Name</Button>
          </div>
          <div className="mt-4 space-y-2">
            <p>Status: {lotteryStatus}</p>
            <p>Verify Status: {verifyStatus}</p>
            <p>Winner: {winner}</p>
            <h3 className="mt-2">Names in the lottery:</h3>
            <ul className="list-disc pl-5">
              {namesList.map((n, index) => (
                <li key={index}>{n}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LotteryComponent;
