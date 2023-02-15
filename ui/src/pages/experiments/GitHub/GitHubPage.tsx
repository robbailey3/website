import GitHubUserProfile from '@features/experiments/ExperimentItem/GitHub/components/GitHubUserProfile';
import { useGithub } from '@features/experiments/ExperimentItem/GitHub/services/github';

const GitHubPage = () => {
	const { repos, user } = useGithub();

	return (
		<>
			{user && <GitHubUserProfile user={user} />}
			<pre>{JSON.stringify(repos, null, 4)}</pre>
		</>
	);
};

export default GitHubPage;
