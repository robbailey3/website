import { initializeApp } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import config from '@services/config';

export class FirebaseWrapper {
	private auth?: Auth;

	public async init() {
		const cfg = await config.getFirebaseConfig();
		const app = await initializeApp(cfg);
		this.auth = getAuth(app);
	}
}
