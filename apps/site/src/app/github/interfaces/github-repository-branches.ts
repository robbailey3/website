export interface Commit {
  sha: string;
  url: string;
}

export interface GitHubRepositoryBranch {
  name: string;
  commit: Commit;
  protected: boolean;
}
