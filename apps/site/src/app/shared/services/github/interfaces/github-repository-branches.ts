export interface Commit {
  sha: string;
  url: string;
}

export interface GitHubRepositoryBranches {
  name: string;
  commit: Commit;
  protected: boolean;
}
