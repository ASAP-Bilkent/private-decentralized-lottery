import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with the research team or contribute to the project.
          </p>
        </div>

        <Separator />

        <section className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Research Group</CardTitle>
              <CardDescription>ASAP Research Group at Bilkent University</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Private Decentralized Lottery is developed by the ASAP Research Group at Bilkent University.
                Our research focuses on cryptographic protocols, privacy-preserving systems, and
                decentralized applications.
              </p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Repository</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The project is open source and available on GitHub. You can explore the code, report issues,
                or contribute to the project.
              </p>
              <Button asChild>
                <Link
                  href="https://github.com/ASAP-Bilkent/private-decentralized-lottery"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Contribution Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We welcome contributions to the project! Here's how you can help:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <strong>Report Issues:</strong> Found a bug or have a suggestion? Open an issue on GitHub
                  with a detailed description.
                </li>
                <li>
                  <strong>Submit Pull Requests:</strong> Have an improvement? Fork the repository, make your
                  changes, and submit a pull request.
                </li>
                <li>
                  <strong>Documentation:</strong> Help improve documentation, add examples, or fix typos.
                </li>
                <li>
                  <strong>Testing:</strong> Help improve test coverage or add new test cases.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Questions or Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For questions, feedback, or collaboration inquiries, please open an issue on the GitHub
                repository or contact the research group through the university channels.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

