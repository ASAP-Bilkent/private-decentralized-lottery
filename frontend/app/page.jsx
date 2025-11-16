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

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Lottery System</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Actions */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Lottery Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  disabled={isLotteryStarted}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLotteryStarted && name.trim()) {
                      handleAddName();
                    }
                  }}
                />
                <Button 
                  onClick={handleAddName}
                  disabled={isLotteryStarted || !name.trim()}
                  className="w-full"
                >
                  Add Name
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleStartLottery}
                  disabled={isLotteryStarted || namesList.length === 0}
                  className="w-full"
                >
                  Start Lottery
                </Button>
                <Button 
                  onClick={handleAnnounceWinner}
                  disabled={!isLotteryStarted}
                  className="w-full"
                >
                  Announce Winner
                </Button>
              </div>

              <Button 
                onClick={handleVerifyName}
                disabled={!name.trim()}
                variant="outline"
                className="w-full"
              >
                Verify Name
              </Button>

              {/* Winner Display */}
              {winner && (
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Winner</p>
                  <p className="text-xl font-bold text-primary">{winner}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column: Names List */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Names in Lottery</CardTitle>
            </CardHeader>
            <CardContent>
              {namesList.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No names added yet. Add names to start the lottery.
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Total: {namesList.length} {namesList.length === 1 ? "name" : "names"}
                  </p>
                  <ul className="space-y-2 max-h-[500px] overflow-y-auto">
                    {namesList.map((n, index) => (
                      <li 
                        key={index}
                        className="p-3 rounded-md bg-muted/50 border border-border hover:bg-muted transition-colors"
                      >
                        <span className="text-sm font-medium text-muted-foreground mr-2">
                          #{index + 1}
                        </span>
                        <span>{n}</span>
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
