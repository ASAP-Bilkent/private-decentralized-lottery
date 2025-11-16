"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const LotteryComponent = () => {
  const [name, setName] = useState("");
  const [winner, setWinner] = useState("");
  const [namesList, setNamesList] = useState([]);
  const [isLotteryStarted, setIsLotteryStarted] = useState(false);

  const handleAddName = async () => {
    if (!name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });

      if (response.ok) {
        toast.success("Name added successfully!", {
          description: `${name} has been added to the lottery.`,
        });
        setNamesList((prev) => [...prev, name]);
        setName(""); // Clear input after successful addition
      } else {
        toast.error("Failed to add name", {
          description: "Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding name", {
        description: "An unexpected error occurred.",
      });
    }
  };

  const handleStartLottery = async () => {
    // Check if there's only one participant
    if (namesList.length === 1) {
      toast.warning("Cannot start lottery", {
        description: "A lottery requires at least 2 participants. Please add more names before starting.",
      });
      return;
    }

    const promise = fetch(`${API_URL}/start_lottery`, {
      method: "POST",
    }).then(async (response) => {
      if (response.ok) {
        setIsLotteryStarted(true);
        return "The lottery has been successfully started. No more names can be added.";
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to start lottery");
      }
    });

    toast.promise(promise, {
      loading: "Starting lottery...",
      success: (data) => {
        return {
          title: "Lottery started!",
          description: data,
        };
      },
      error: (error) => {
        return {
          title: "Failed to start lottery",
          description: error.message || "Please try again.",
        };
      },
    });
  };

  const handleAnnounceWinner = async () => {
    const promise = fetch(`${API_URL}/announce_winner`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const winnerData = await response.json();
        setWinner(winnerData);
        return winnerData;
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to announce winner");
      }
    });

    toast.promise(promise, {
      loading: "Announcing winner...",
      success: (data) => {
        return {
          title: "Winner announced!",
          description: data,
        };
      },
      error: (error) => {
        return {
          title: "Failed to announce winner",
          description: error.message || "Please try again.",
        };
      },
      duration: 10000,
    });
  };

  const handleVerifyName = async () => {
    if (!name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });

      if (response.ok) {
        toast.success("Name verified!", {
          description: `${name} is in the lottery.`,
        });
      } else {
        toast.error("Name not found", {
          description: `${name} is not in the lottery.`,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying name", {
        description: "An unexpected error occurred.",
      });
    }
  };

  const CONTRACT_ADDRESS = "0xC811D13F35A3240e0Fcf7D28Ed0A92f617B44752";
  const ETHERSCAN_URL = `https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Lottery System
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Decentralized & Verifiable Random Selection
                </p>
              </div>
            </div>
            <a
              href={ETHERSCAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted/50"
            >
              <span>Deployed Contract</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              isLotteryStarted 
                ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20" 
                : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isLotteryStarted ? "bg-green-500 animate-pulse" : "bg-blue-500"
              }`} />
              {isLotteryStarted ? "Lottery Active" : "Registration Open"}
            </div>
            {namesList.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {namesList.length} {namesList.length === 1 ? "participant" : "participants"} registered
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Participants</p>
                  <p className="text-3xl font-bold">{namesList.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="text-xl font-bold">
                    {isLotteryStarted ? "Active" : "Pending"}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isLotteryStarted ? "text-green-500" : "text-muted-foreground"}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Winner</p>
                  <p className="text-xl font-bold">
                    {winner ? "Selected" : "Pending"}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={winner ? "text-yellow-500" : "text-muted-foreground"}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Actions */}
          <Card className="shadow-xl border-2 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="border-b">
              <CardTitle className="text-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Lottery Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter participant name"
                    disabled={isLotteryStarted}
                    className="pl-10"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isLotteryStarted && name.trim()) {
                        handleAddName();
                      }
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                </div>
                <Button 
                  onClick={handleAddName}
                  disabled={isLotteryStarted || !name.trim()}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Participant
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleStartLottery}
                  disabled={isLotteryStarted || namesList.length === 0}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Lottery
                </Button>
                <Button 
                  onClick={handleAnnounceWinner}
                  disabled={!isLotteryStarted}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Announce Winner
                </Button>
              </div>

              <Button 
                onClick={handleVerifyName}
                disabled={!name.trim()}
                variant="outline"
                className="w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Verify Name
              </Button>

              {/* Winner Display */}
              {winner && (
                <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/30 shadow-lg animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-600 dark:text-yellow-400"
                      >
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">🏆 Winner Announced</p>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 dark:from-yellow-400 dark:to-yellow-300 bg-clip-text text-transparent">
                    {winner}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column: Names List */}
          <Card className="shadow-xl border-2 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Participants
                </CardTitle>
                {namesList.length > 0 && (
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {namesList.length}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {namesList.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground font-medium mb-1">No participants yet</p>
                  <p className="text-sm text-muted-foreground">
                    Add names to start the lottery
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ul className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {namesList.map((n, index) => (
                      <li 
                        key={index}
                        className="group p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 border border-border hover:border-primary/30 hover:from-muted hover:to-muted/80 transition-all duration-200 flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="flex-1 font-medium">{n}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LotteryComponent;
