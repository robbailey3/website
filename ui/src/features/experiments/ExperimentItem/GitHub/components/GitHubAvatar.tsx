export interface GitHubAvatarProps {
	imageUrl: string;
	name: string;
}

const GitHubAvatar = (props: GitHubAvatarProps) => {
	console.log(props);
	const { imageUrl, name } = props;

	return <img src={imageUrl} alt={`${name} avatar image`} />;
};

export default GitHubAvatar;
