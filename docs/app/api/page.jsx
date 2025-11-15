import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function API() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">API Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Reference documentation for the Private Decentralized Lottery API endpoints.
          </p>
        </div>

        <Separator />

        <div className="space-y-6">
          {/* Add Name Endpoint */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">POST</Badge>
                  <CardTitle>/add</CardTitle>
                </div>
              </div>
              <CardDescription>Add a participant name to the lottery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request</h4>
                <p className="text-sm text-muted-foreground mb-2">Content-Type: application/json</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"John Doe"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <p className="text-sm text-muted-foreground mb-2">Status: 200 OK</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Name added"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  Adds a participant name to the lottery system. The name is added to both the internal
                  list and the RSA accumulator, creating a cryptographic commitment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Start Lottery Endpoint */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">POST</Badge>
                  <CardTitle>/start_lottery</CardTitle>
                </div>
              </div>
              <CardDescription>Initialize the lottery and request VRF randomness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request</h4>
                <p className="text-sm text-muted-foreground">No request body required</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <p className="text-sm text-muted-foreground mb-2">Status: 200 OK</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Lottery started, VRF request sent"`}
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Status: 400 Bad Request</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"No names in the lottery"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  Starts the lottery process by creating a commitment from the accumulator state and
                  sending it to the blockchain VRF contract. The VRF will generate a random number
                  based on this commitment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Announce Winner Endpoint */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">GET</Badge>
                  <CardTitle>/announce_winner</CardTitle>
                </div>
              </div>
              <CardDescription>Retrieve the lottery winner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request</h4>
                <p className="text-sm text-muted-foreground">No request body required</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <p className="text-sm text-muted-foreground mb-2">Status: 200 OK</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"The winner is: John Doe"`}
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Status: 400 Bad Request</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Lottery has not started"`}
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Status: 500 Internal Server Error</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Winner index is invalid"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  Retrieves the winner of the lottery. The winner is selected using the random number
                  from the VRF contract, ensuring fair and verifiable selection.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Verify Endpoint */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">POST</Badge>
                  <CardTitle>/verify</CardTitle>
                </div>
              </div>
              <CardDescription>Verify if a name is in the lottery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request</h4>
                <p className="text-sm text-muted-foreground mb-2">Content-Type: application/json</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"John Doe"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <p className="text-sm text-muted-foreground mb-2">Status: 200 OK</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Selected name 'John Doe' is in with proof: [proof details]"`}
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Status: 404 Not Found</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Name not found"`}
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Status: 500 Internal Server Error</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"Failed to compute witness"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  Verifies if a given name is included in the lottery using cryptographic membership
                  proofs. The proof demonstrates membership without revealing other participants'
                  identities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Base URL</h2>
          <Card className="w-full">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                All endpoints are served at: <code className="bg-muted px-2 py-1 rounded">http://localhost:8080</code>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

