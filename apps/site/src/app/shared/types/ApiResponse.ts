export type APIResponse<T> = {
  result: T;
  results: T[];
  status: number;
  timestamp: number;
  count: number;
};
