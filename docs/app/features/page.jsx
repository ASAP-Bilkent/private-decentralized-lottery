import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Scale, Network } from "lucide-react";

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Features</h1>
          <p className="text-lg text-muted-foreground">
            Explore the key features that make the Private Decentralized Lottery secure, fair, and verifiable.
          </p>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Participant Anonymity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Participants can join the lottery without revealing their identities. The system uses
                RSA accumulators to maintain commitments to participants without storing their names
                in plaintext. Membership proofs allow verification without identity disclosure.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle>Public Verifiability</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Anyone can verify the correctness of the lottery process. Cryptographic proofs enable
                verification of participant membership and winner selection. All operations are
                transparent and auditable through blockchain integration.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Scale className="h-6 w-6 text-primary" />
                <CardTitle>Fairness Without Centralization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                The lottery ensures fairness through blockchain-based Verifiable Random Functions (VRF).
                The randomness is cryptographically secure, unpredictable, and cannot be manipulated
                by any party, including the lottery operator.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-6 w-6 text-primary" />
                <CardTitle>Decentralized Architecture</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                The system operates without a single trusted authority. By leveraging blockchain technology
                and cryptographic primitives, the protocol eliminates single points of failure and
                reduces the risk of manipulation or corruption.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Additional Benefits</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 w-full">
              <Badge variant="secondary">Cryptographic Security</Badge>
              <p className="text-sm text-muted-foreground">
                Built on proven cryptographic primitives with strong security guarantees.
              </p>
            </div>
            <div className="space-y-2 w-full">
              <Badge variant="secondary">Efficient Verification</Badge>
              <p className="text-sm text-muted-foreground">
                Fast membership proofs and verification without requiring full participant lists.
              </p>
            </div>
            <div className="space-y-2 w-full">
              <Badge variant="secondary">Transparent Process</Badge>
              <p className="text-sm text-muted-foreground">
                All critical operations are recorded on the blockchain for full transparency.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

