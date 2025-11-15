import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Installation() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
          <p className="text-lg text-muted-foreground">
            Get started with the Private Decentralized Lottery by following these setup instructions.
          </p>
        </div>

        <Separator />

        {/* Prerequisites */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Required Software</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <strong>Rust</strong> - <a href="https://www.rust-lang.org/tools/install" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Install Rust</a>
                </li>
                <li>
                  <strong>Node.js</strong> - <a href="https://nodejs.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Install Node.js</a> (for frontend components)
                </li>
                <li>
                  <strong>Yarn</strong> - <a href="https://classic.yarnpkg.com/lang/en/docs/install/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Install Yarn</a> (for package management)
                </li>
              </ul>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Windows-specific requirements:</p>
                <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
                  <li>
                    <strong>MSYS2</strong> - <a href="https://www.msys2.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Install MSYS2</a> (required for building on Windows)
                  </li>
                  <li>
                    <strong>GCC</strong> - Install via MSYS2: <code className="bg-background px-1 py-0.5 rounded text-xs">pacman -S mingw-w64-x86_64-gcc</code>
                  </li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-900 dark:text-yellow-100">
                  <strong>Important:</strong> The repository must be cloned and built in a directory path
                  containing <strong>ASCII characters only</strong>. Non-ASCII characters in the path may
                  cause build issues.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Environment Variables */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Environment Variables</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Before building and running the project, create a <code className="bg-muted px-1 py-0.5 rounded text-sm">.env</code> file
                in the root directory and add the following values:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`PRIVATE_KEY="your private key"
RPC_URL="https://sepolia.infura.io/v3/yourcustomurl"`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Backend Setup */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Backend Setup</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 1: Clone the Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`git clone https://github.com/ASAP-Bilkent/private-decentralized-lottery.git
cd private-decentralized-lottery`}
              </pre>
              <p className="text-sm text-muted-foreground mb-2">Clone the Accumulator Repository:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`git clone https://github.com/cambrian/accumulator.git`}
              </pre>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 2: Install Dependencies and Build</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`cargo build --release`}
              </pre>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 3: Run the Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`cargo run`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                The backend server will start on <code className="bg-background px-1 py-0.5 rounded text-xs">127.0.0.1:8080</code>
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Frontend Setup */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Frontend Setup</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 1: Navigate to Frontend Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`cd frontend`}
              </pre>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 2: Install Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`yarn install`}
              </pre>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 3: Build the Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`yarn build`}
              </pre>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 4: Start the Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`yarn start`}
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

