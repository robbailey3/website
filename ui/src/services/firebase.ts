import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
	signInWithEmailAndPassword,
	getAuth,
	Auth,
	UserCredential
} from 'firebase/auth';
import { FirebaseConfig } from '../types/FirebaseConfig';
import config from './config';

class FirebaseService {
	private firebaseConfig?: FirebaseConfig;

	private auth?: Auth;

	private credentials?: UserCredential;

	public async init() {
		try {
			await this.getConfig();
			const app = await initializeApp(this.firebaseConfig as FirebaseOptions);
			this.auth = await getAuth(app);
		} catch (e: any) {
			// TODO: Show a toast or something
			console.error(e);
		}
	}

	public async login(email: string, password: string) {
		if (!this.auth) {
			throw new Error('Auth not initialised');
		}

		this.credentials = await signInWithEmailAndPassword(
			this.auth,
			email,
			password
		);
	}

	public async getToken(): Promise<string | undefined> {
		if (!this.credentials) {
			throw new Error('User is not logged in');
		}
		return await this.credentials.user.getIdToken();
	}

	public isLoggedIn() {
		console.log(this);
		return !!this.credentials;
	}

	private async getConfig() {
		this.firebaseConfig = await config.getFirebaseConfig();
	}
}

export default new FirebaseService();
