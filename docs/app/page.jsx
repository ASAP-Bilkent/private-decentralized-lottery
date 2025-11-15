import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, CheckCircle2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 space-y-6 py-20 md:py-32 lg:py-40">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary" className="mb-2">
            Cryptographic Protocol
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Private Decentralized Lottery
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            A publicly verifiable lottery system that ensures participant anonymity and fairness
            without relying on a centralized authority. Developed by the ASAP Research Group at Bilkent University.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/installation">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="w-full">
            <CardHeader>
              <Shield className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Anonymity</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Participant identities remain private throughout the lottery process using cryptographic accumulators.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CheckCircle2 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Verifiable</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Publicly verifiable results with cryptographic proofs that anyone can verify.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Fair</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ensures fairness through Verifiable Random Functions (VRF) from blockchain.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Decentralized</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                No single point of failure or centralized authority required.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Overview Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-lg text-muted-foreground">
            The Private Decentralized Lottery is a cryptographic protocol that enables lottery systems
            where participants can verify the fairness and correctness of the process without revealing
            their identities. The system uses RSA accumulators to maintain participant privacy and
            blockchain-based Verifiable Random Functions (VRF) to ensure unpredictable and verifiable
            randomness for winner selection.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/features">View Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

