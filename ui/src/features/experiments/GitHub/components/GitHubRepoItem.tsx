import Pill from '@components/common/Pill/Pill';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GitHubRepo } from '../types/repo';

export interface GithubRepoItemProps {
	repo: GitHubRepo;
}

const GithubRepoItem = (props: GithubRepoItemProps) => {
	const { repo } = props;
	return (
		<div className="h-full p-4">
			<Flex className="border p-8 h-full" column justify="between">
				<h2 className="text-base break-words m-0 mb-2">
					<a href={repo.url} target="_blank" rel="noopener noreferrer">
						{repo.name}
					</a>
				</h2>
				<p>{repo.description}</p>
				<Flex className="mt-4" justify="between">
					{repo.language && (
						<FlexItem>
							<Pill>{repo.language}</Pill>
						</FlexItem>
					)}
					<FlexItem>
						<FontAwesomeIcon icon={faSave} className="mr-2" />
						{repo.size}KB
					</FlexItem>
				</Flex>
			</Flex>
		</div>
	);
};

export default GithubRepoItem;
