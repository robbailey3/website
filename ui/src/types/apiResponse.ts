export interface APIResponse<T> {
	result: T;
	timestamp: number;
	success: boolean;
}
