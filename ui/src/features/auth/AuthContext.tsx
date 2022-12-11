import * as React from 'react';

export interface AuthState {
	isLoggedIn: boolean;
}

const defaultAuthState: AuthState = {
	isLoggedIn: false
};

const AuthContext = React.createContext(defaultAuthState);

type Action = { type: 'login' };

function authReducer(state: AuthState, action: Action) {
	switch (action.type) {
		case 'login':
			state.isLoggedIn = true;
			return;
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function CountProvider({ children }) {
	const [state, dispatch] = React.useReducer(authReducer);
	// NOTE: you *might* need to memoize this value
	// Learn more in http://kcd.im/optimize-context
	const value = { state, dispatch };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { CountProvider };
