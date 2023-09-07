import { APIResponse } from 'types/apiResponse';
import useApi from '../../../shared/useApi';
import { GitHubRepo } from './types/repo';

export function useGithubRepositories(username: string) {
	const { data, isLoading, error } = useApi<APIResponse<GitHubRepo[]>>(
		`/github/repos?username=${username}`
	);

	return {
		repos: data?.result,
		isLoading,
		error
	};
}
