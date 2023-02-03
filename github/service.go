package github

type Service interface {
  GetRepos(req GetReposRequest) ([]*RepositoryViewModel, error)
}

type serviceImpl struct {
  githubClient ApiClient
}

func NewService() Service {
  return &serviceImpl{githubClient: NewApiClient()}
}

func (s *serviceImpl) GetRepos(req GetReposRequest) ([]*RepositoryViewModel, error) {
  repositories, err := s.githubClient.GetRepositories(req)

  if err != nil {
    return nil, err
  }

  var repos []*RepositoryViewModel

  for _, repo := range repositories {
    repos = append(repos, repo.ToViewModel())
  }

  return repos, nil
}
