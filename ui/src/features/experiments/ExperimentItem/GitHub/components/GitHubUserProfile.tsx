import { GitHubUser } from '../types/user';
import GitHubAvatar from './GitHubAvatar';

export interface GitHubUserProfileProps {
	user: GitHubUser;
}

const GitHubUserProfile = (props: GitHubUserProfileProps) => {
	const { user } = props;

	return (
		<section>
			<pre>{JSON.stringify(user, null, 4)}</pre>
			<GitHubAvatar imageUrl={user.avatarUrl} name={user.name} />
		</section>
	);
};

export default GitHubUserProfile;
