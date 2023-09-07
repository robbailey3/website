import AnimateOnEnter from '@components/animations/AnimateOnEnter/AnimateOnEnter';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import { faBriefcase, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GitHubUser } from '../types/user';
import GitHubAvatar from './GitHubAvatar';
import { useGithubUser } from '../useGithubUser';

export interface GitHubUserProfileProps {
	user: GitHubUser;
}

const GitHubUserProfile = () => {
	const { user, isLoading, error } = useGithubUser('robbailey3');

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!user) {
		return <div>No data</div>;
	}

	return (
		<section>
			<AnimateOnEnter
				initial={{ y: -100, opacity: 0 }}
				animation={{ y: 0, opacity: 1 }}
			>
				<Flex
					align="center"
					justify="center"
					className="p-8 text-center"
					column
				>
					<GitHubAvatar imageUrl={user.avatarUrl} name={user.name} />
					<FlexItem className="my-4">
						<h1>{user.name}</h1>
					</FlexItem>
					<FlexItem>
						<p className="whitespace-pre-line text-center">{user.bio}</p>
					</FlexItem>
					<FlexItem>
						<Flex className="gap-8 my-8">
							<FlexItem>
								<p>
									<span>
										<FontAwesomeIcon icon={faBriefcase} className="mr-2" />{' '}
										Company:{' '}
									</span>
									<span>{user.company}</span>
								</p>
							</FlexItem>
							<FlexItem>
								<p>
									<span>
										<FontAwesomeIcon icon={faMapMarker} className="mr-2" />
										Location:{' '}
									</span>
									<span>{user.location}</span>
								</p>
							</FlexItem>
						</Flex>
					</FlexItem>
				</Flex>
			</AnimateOnEnter>
		</section>
	);
};

export default GitHubUserProfile;
