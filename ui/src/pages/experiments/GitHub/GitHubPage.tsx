import Container from '@components/layout/Container/Container';
import GitHubRepoList from '@features/experiments/GitHub/components/GitHubRepoList';
import GitHubUserProfile from '@features/experiments/GitHub/components/GitHubUserProfile';

const GitHubPage = () => {
	return (
		<>
			<Container>
				<GitHubUserProfile />
				<GitHubRepoList />
			</Container>
		</>
	);
};

export default GitHubPage;
