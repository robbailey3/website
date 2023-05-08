import React from 'react';
import { APIResponse } from 'types/apiResponse';
import { GitHubRepo } from '../types/repo';
import { GitHubUser } from '../types/user';

export function useGithub() {
	const BASE_URL = import.meta.env.DEV ? 'http://localhost:8080/api' : '/api';

	const [user, setUser] = React.useState<GitHubUser>();

	const [repos, setRepos] = React.useState<GitHubRepo[]>();

	const [isLoading, setIsLoading] = React.useState(false);

	const [error, setError] = React.useState(false);

	const fetchUser = async () => {
		const response = await fetch(`${BASE_URL}/github/user`);

		const json: APIResponse<GitHubUser> = await response.json();

		setUser(json.result);
	};

	const fetchRepos = async () => {
		const response = await fetch(
			`${BASE_URL}/github/repos?sort=pushed&direction=descending&per_page=50`
		);

		const json: APIResponse<GitHubRepo[]> = await response.json();

		setRepos(json.result);
	};

	const load = async () => {
		setIsLoading(true);
		try {
			fetchRepos();
			fetchUser();
		} catch (e: any) {
			console.error(e);
			setError(true);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		load();
	}, []);

	return { user, repos, error, isLoading };
}
