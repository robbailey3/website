import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
	signInWithEmailAndPassword,
	getAuth,
	Auth,
	setPersistence,
	browserLocalPersistence,
	onAuthStateChanged
} from 'firebase/auth';
import config from './config';

interface FirebaseAuth {
	auth: Auth;
}

export function useFirebaseAuth() {
	const auth = ref();

	const init = async () => {
		const cfg = await config.getFirebaseConfig();
		const app = await initializeApp(cfg);
		auth.value = getAuth(app);
	};

	onMounted(async () => {
		await init();
	});

	const login = async (username: string, password: string) => {
		try {
			await setPersistence(auth.value, browserLocalPersistence);
			const result = await signInWithEmailAndPassword(
				auth.value,
				username,
				password
			);
			console.log({ result });
		} catch (e) {
			console.error(e);
		}
	};

	const getIdToken = async () => {
		return await auth.value.currentUser?.getIdToken();
	};

	return { login, getIdToken };
}
