import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-semibold">Private Decentralized Lottery</h3>
            <p className="text-sm text-muted-foreground">
              A cryptographic protocol for publicly verifiable lottery systems
              with participant anonymity and fairness.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Research Group</h3>
            <p className="text-sm text-muted-foreground">
              Developed by the ASAP Research Group at Bilkent University.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Links</h3>
            <div className="flex flex-col space-y-1.5">
              <Link
                href="https://github.com/ASAP-Bilkent/private-decentralized-lottery"
                className="text-sm text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 pt-6 pb-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ASAP Research Group, Bilkent University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

