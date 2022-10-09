export interface ApiResponse<T> {
	result: T;
	timestamp: number;
	success: boolean;
	error: ErrorResponse;
}

export interface ErrorResponse {
	code: number;
	message: string;
	validationErrors: ValidationError[];
}

export interface ValidationError {
	field: string;
	tag: string;
	value: string;
}
