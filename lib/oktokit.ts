// Assuming octokitSetup.ts is in the same directory
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();
async function getRepoLanguageStats(
  owner: string,
  repo: string
): Promise<{ [key: string]: number } | null> {
  try {
    const response = await octokit.repos.listLanguages({
      owner,
      repo,
    });
    return response.data;
  } catch {
    return null;
  }
}

export default getRepoLanguageStats;
