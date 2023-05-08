import AnimateOnEnter from '@components/animations/AnimateOnEnter/AnimateOnEnter';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import { GitHubRepo } from '../types/repo';
import GitHubRepoItem from './GitHubRepoItem';

export interface GitHubRepoListProps {
	repos: GitHubRepo[];
}

const GitHubRepoList = (props: GitHubRepoListProps) => {
	const { repos } = props;

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
