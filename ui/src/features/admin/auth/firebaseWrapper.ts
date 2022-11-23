import { initializeApp } from 'firebase/app';
import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User
} from 'firebase/auth';
import config from '@services/config';
import { Subject } from 'rxjs';

export class FirebaseWrapper {
	private auth?: Auth;

	public $user: Subject<User | null> = new Subject();

	public async init() {
		const cfg = await config.getFirebaseConfig();
		const app = await initializeApp(cfg);
		this.auth = getAuth(app);
		onAuthStateChanged(this.auth, (user) => {
			this.$user.next(user);
		});
	}

	public async login(email: string, passsword: string) {
		if (!this.auth) {
			// TODO: Maybe throw an error here
			return;
		}
		await signInWithEmailAndPassword(this.auth, email, passsword);
	}

	public async getIdToken() {
		if (!this.auth) {
			// TODO: Maybe throw an error here
			return;
		}
		return this.auth.currentUser?.getIdToken();
	}

	public async logout() {
		if (!this.auth) {
			// TODO: Maybe throw an error here
			return;
		}
		await this.auth.signOut();
	}
}
