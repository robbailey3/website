import { Auth, UserCredential } from 'firebase/auth';
import * as React from 'react';
import { AuthActionType, AuthReducer } from './AuthReducer';
import axios from 'axios';
import { APIResponse } from 'types/apiResponse';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

export interface AuthState {
	user: UserCredential | undefined;
	isLoading: boolean;
	isError: boolean;
}

export const initialAuthState: AuthState = {
	user: undefined,
	isLoading: false,
	isError: false
};

const AuthContext = React.createContext<AuthState>(initialAuthState);

export const useAuthContext = () => React.useContext(AuthContext);

const AuthProvider = (props: { children: React.ReactNode }) => {
	const { children } = props;
	const [state, dispatch] = React.useReducer(AuthReducer, initialAuthState);
	const [app, setApp] = React.useState<FirebaseApp>();
	const [auth, setAuth] = React.useState<Auth>();

	const initialiseFirebase = async () => {
		const config = await getFirebaseConfig();
		const app = await initializeApp(config);
		setApp(app);
		setAuth(() => getAuth(app));
	};

	const getFirebaseConfig = async (): Promise<FirebaseConfig> => {
		const result = await axios.get<APIResponse<FirebaseConfig>>(
			'http://localhost:8080/api/config/firebase'
		);
		const response = result.data;
		return response.result;
	};

	React.useEffect(() => {
		initialiseFirebase();
	}, []);

	const login = async (email: string, password: string) => {
		if (!auth) {
			throw new Error('Firebase not initialised');
		}
		dispatch({ type: AuthActionType.SET_LOADING, payload: true });
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			dispatch({ type: AuthActionType.SET_USER, payload: user });
		} catch (e: any) {
			dispatch({ type: AuthActionType.SET_ERROR, payload: true });
		}
	};

	return (
		<AuthContext.Provider value={{ ...state, login } as any}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
