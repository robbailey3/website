import FlexItem from '@components/layout/FlexItem/FlexItem';

export interface GitHubAvatarProps {
	imageUrl: string;
	name: string;
}

const GitHubAvatar = (props: GitHubAvatarProps) => {
	const { imageUrl, name } = props;

	return (
		<FlexItem>
			<img
				src={imageUrl}
				alt={`${name} avatar image`}
				className="rounded-full border-4 shadow-lg border-primary-500 md:w-56 w-32"
			/>
		</FlexItem>
	);
};

export default GitHubAvatar;
