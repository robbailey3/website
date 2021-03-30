export interface Auth {
  id?: number | string;
  token: string;
}

export function createAuth(params: Partial<Auth>) {
  return { ...params } as Auth;
}
