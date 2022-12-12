import { AuthState } from './AuthContext';
import { UserCredential } from 'firebase/auth';

export enum AuthActionType {
	SET_LOADING,
	SET_ERROR,
	SET_USER
}

export type AuthAction =
	| { type: AuthActionType.SET_LOADING; payload: boolean }
	| { type: AuthActionType.SET_ERROR; payload: boolean }
	| { type: AuthActionType.SET_USER; payload: UserCredential };

export const AuthReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case AuthActionType.SET_LOADING:
			return {
				...state,
				isLoading: action.payload
			};
		case AuthActionType.SET_ERROR:
			return {
				...state,
				isError: action.payload
			};
		case AuthActionType.SET_USER:
			return {
				...state,
				user: action.payload
			};
	}
};
