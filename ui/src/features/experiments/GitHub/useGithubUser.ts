import useApi from '@shared/useApi';
import { GitHubUser } from './types/user';

export function useGithubUser(username: string) {
	const { data, isLoading, error } = useApi<GitHubUser>(
		`/github/user?username=${username}`
	);

	return {
		data,
		isLoading,
		error
	};
}
