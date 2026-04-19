import { LandingPage } from "@/components/landing-page";
import { getGithubDataset } from "@/lib/github-data";

export const dynamic = "force-static";

export default async function Home() {
  const githubData = await getGithubDataset();

  return <LandingPage githubData={githubData} />;
}
