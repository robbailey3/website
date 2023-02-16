import Container from '@components/layout/Container/Container';
import GitHubRepoList from '@features/experiments/ExperimentItem/GitHub/components/GitHubRepoList';
import GitHubUserProfile from '@features/experiments/ExperimentItem/GitHub/components/GitHubUserProfile';
import { useGithub } from '@features/experiments/ExperimentItem/GitHub/services/github';

const GitHubPage = () => {
	const { repos, user } = useGithub();

	return (
		<>
			<Container>
				{user && <GitHubUserProfile user={user} />}
				{repos && <GitHubRepoList repos={repos} />}
			</Container>
		</>
	);
};

export default GitHubPage;
