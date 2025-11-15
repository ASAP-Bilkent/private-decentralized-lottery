import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About</h1>
          <p className="text-lg text-muted-foreground">
            Learn about the Private Decentralized Lottery protocol and the research behind it.
          </p>
        </div>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Project Description</h2>
          <p className="text-muted-foreground">
            The <strong>Private Decentralized Lottery</strong> is a cryptographic protocol developed by the
            ASAP Research Group at Bilkent University. It enables a publicly verifiable lottery system that
            ensures participant anonymity and fairness without relying on a centralized authority.
          </p>
          <p className="text-muted-foreground">
            Traditional lottery systems often require participants to trust a central authority to maintain
            fairness and privacy. Our protocol eliminates this trust requirement by using cryptographic
            primitives that allow anyone to verify the correctness of the lottery process while maintaining
            participant privacy.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Research Background</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>ASAP Research Group</CardTitle>
              <CardDescription>Bilkent University</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This project is part of ongoing research at Bilkent University's ASAP Research Group,
                focusing on cryptographic protocols, privacy-preserving systems, and decentralized
                applications. The group explores cutting-edge cryptographic techniques to solve real-world
                problems in distributed systems.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Problem Statement</h2>
          <p className="text-muted-foreground">
            Traditional lottery systems face several challenges:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Privacy concerns:</strong> Participants must reveal their identities to participate,
              which can lead to privacy violations or targeted attacks.
            </li>
            <li>
              <strong>Trust requirements:</strong> Participants must trust a central authority to fairly
              conduct the lottery and not manipulate results.
            </li>
            <li>
              <strong>Verifiability:</strong> It's difficult for participants to verify that the lottery
              was conducted fairly without trusting the central authority.
            </li>
            <li>
              <strong>Single point of failure:</strong> Centralized systems are vulnerable to attacks,
              corruption, or technical failures.
            </li>
          </ul>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Protocol Overview</h2>
          <p className="text-muted-foreground">
            Our protocol addresses these challenges through:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>RSA Accumulators:</strong> Used to maintain a commitment to all participants without
              revealing individual identities. Participants can prove membership without revealing their
              identity.
            </li>
            <li>
              <strong>Verifiable Random Functions (VRF):</strong> Blockchain-based VRF provides
              unpredictable, verifiable randomness for winner selection that cannot be manipulated.
            </li>
            <li>
              <strong>Cryptographic Proofs:</strong> Membership proofs allow anyone to verify that a
              participant was included in the lottery without revealing who they are.
            </li>
            <li>
              <strong>Decentralized Architecture:</strong> The system operates without a single trusted
              authority, leveraging blockchain technology for transparency and verifiability.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

