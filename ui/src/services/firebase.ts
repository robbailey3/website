import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
	signInWithEmailAndPassword,
	getAuth,
	Auth,
	UserCredential
} from 'firebase/auth';
import { FirebaseConfig } from '../types/FirebaseConfig';
import config from './config';

const injectionKey = Symbol('firebaseInjectionKey');

export function initialiseFirebaseAuth() {
	const firebaseConfig = ref<FirebaseConfig>();

	const auth = ref<Auth>();

	const initialiseApp = async () => {
		try {
			await getConfig();
			const app = await initializeApp(firebaseConfig.value as FirebaseOptions);
			auth.value = await getAuth(app);
		} catch (e: any) {
			// TODO: Show a toast or something
			console.error(e);
		}
	};

	const getConfig = async () => {
		firebaseConfig.value = await config.getFirebaseConfig();
	};

	provide(injectionKey, {
		auth: auth.value
	});
}

export function useFirebaseAuth() {
	const { auth } = inject(injectionKey);

	if (!auth) {
		throw new Error('Firebase auth not initialised');
	}

	const login = async (email: string, password: string) => {
		if (!auth) {
			throw new Error('Auth not initialised');
		}

		this.credentials = await signInWithEmailAndPassword(
			this.auth,
			email,
			password
		);
	};
}

class FirebaseService {
	private firebaseConfig?: FirebaseConfig;

	private auth?: Auth;

	private credentials?: UserCredential;

	public;

	public async getToken(): Promise<string | undefined> {
		if (!this.credentials) {
			throw new Error('User is not logged in');
		}
		return await this.credentials.user.getIdToken();
	}
}

export default new FirebaseService();
