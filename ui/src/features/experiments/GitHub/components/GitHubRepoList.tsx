import AnimateOnEnter from '@components/animations/AnimateOnEnter/AnimateOnEnter';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import { GitHubRepo } from '../types/repo';
import GitHubRepoItem from './GitHubRepoItem';
import { useGithubRepositories } from '../useGithubRepositories';

export interface GitHubRepoListProps {
	repos: GitHubRepo[];
}

const GitHubRepoList = () => {
	const { repos, error, isLoading } = useGithubRepositories('robbailey3');

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!repos) {
		return <div>No data</div>;
	}

	return (
		<Flex wrap align="stretch">
			{repos.map((repo, index) => (
				<FlexItem key={repo.id} className="md:basis-1/3 basis-full">
					<AnimateOnEnter
						className="h-full"
						initial={{ y: 10, opacity: 0 }}
						animation={{
							transition: { delay: 0.1 * (index + 1) },
							y: 0,
							opacity: 1
						}}
					>
						<GitHubRepoItem repo={repo} />
					</AnimateOnEnter>
				</FlexItem>
			))}
		</Flex>
	);
};

export default GitHubRepoList;
