import useSWR from 'swr';

const fetcher = async (url: string) => {
	const BASE_URL = import.meta.env.DEV ? 'http://localhost:8080/api' : '/api';

	const response = await fetch(`${BASE_URL}${url}`);

	if (response.status === 200) {
		const json = await response.json();
		return json;
	}

	throw new Error('Something went wrong');
};

function useApi<T>(url: string) {
	const { data, isLoading, error, isValidating, mutate } = useSWR<T>(
		url,
		fetcher
	);

	return { data, isLoading, error, isValidating, mutate };
}

export default useApi;
