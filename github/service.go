package github

type Service interface {
  GetRepos(req GetReposRequest) ([]*RepositoryViewModel, error)
  GetUser(req GetUserRequest) (*UserViewModel, error)
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

func (s *serviceImpl) GetUser(req GetUserRequest) (*UserViewModel, error) {
  user, err := s.githubClient.GetUser(req)

  if err != nil {
    return nil, err
  }

  return user.ToViewModel(), nil
}
