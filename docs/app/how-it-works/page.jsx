import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Play, Trophy, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">How It Works</h1>
          <p className="text-lg text-muted-foreground">
            Understand the step-by-step process of the Private Decentralized Lottery protocol.
          </p>
        </div>

        <Separator />

        {/* Protocol Flow */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Protocol Flow</h2>
          
          <div className="space-y-4">
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Step 1</Badge>
                  <UserPlus className="h-5 w-5" />
                  <CardTitle>Participant Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Participants submit their names to the system. Each name is added to an RSA accumulator,
                  which creates a cryptographic commitment. The accumulator allows the system to maintain
                  a commitment to all participants without storing their identities in plaintext.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Step 2</Badge>
                  <Play className="h-5 w-5" />
                  <CardTitle>Lottery Initialization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Once registration is complete, the lottery is started. The system creates a commitment
                  from the accumulator state and sends it to a blockchain-based Verifiable Random Function
                  (VRF) contract. The VRF contract generates a random number based on this commitment,
                  ensuring the randomness is unpredictable and verifiable.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Step 3</Badge>
                  <Trophy className="h-5 w-5" />
                  <CardTitle>Winner Selection</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  The random number from the VRF is used to select the winner from the list of participants.
                  The selection process is deterministic and verifiable - anyone can verify that the winner
                  was selected fairly using the commitment and the VRF output.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Step 4</Badge>
                  <CheckCircle className="h-5 w-5" />
                  <CardTitle>Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Participants can verify their membership in the lottery using cryptographic proofs.
                  The system can generate membership proofs that demonstrate a participant was included
                  without revealing their identity. Anyone can verify the winner selection process
                  using the accumulator commitment and VRF output.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Cryptographic Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Cryptographic Components</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>RSA Accumulators</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  RSA accumulators allow the system to maintain a commitment to a set of participants
                  without revealing individual identities. They support efficient membership proofs
                  that can be verified by anyone.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Verifiable Random Functions (VRF)</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Blockchain-based VRF provides cryptographically secure randomness. The VRF output is
                  unpredictable, verifiable, and cannot be manipulated by any party, including the
                  lottery operator.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Blockchain Integration */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Blockchain Integration</h2>
          <p className="text-muted-foreground">
            The protocol integrates with Ethereum (Sepolia testnet) to leverage VRF for random number
            generation. The VRF contract ensures that:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>The random number is generated based on the accumulator commitment</li>
            <li>The randomness is cryptographically secure and unpredictable</li>
            <li>Anyone can verify the VRF output on the blockchain</li>
            <li>The process is transparent and auditable</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

