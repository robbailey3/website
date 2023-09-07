import { APIResponse } from 'types/apiResponse';
import useApi from '../../../shared/useApi';
import { GitHubUser } from './types/user';

export function useGithubUser(username: string) {
	const { data, isLoading, error } = useApi<APIResponse<GitHubUser>>(
		`/github/user?username=${username}`,
		{}
	);

	return {
		user: data?.result,
		isLoading,
		error
	};
}
