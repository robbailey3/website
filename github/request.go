package github

type GetReposRequest struct {
  Username  string
  Sort      string
  Direction string
  PerPage   int
  Page      int
}
