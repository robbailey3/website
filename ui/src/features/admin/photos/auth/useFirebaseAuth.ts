import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
	signInWithEmailAndPassword,
	getAuth,
	Auth,
	setPersistence,
	browserLocalPersistence,
	onAuthStateChanged
} from 'firebase/auth';
import { injectionKeys } from '../../../../injectionKeys';
import { FirebaseWrapper } from './firebaseWrapper';

interface FirebaseAuth {
	auth: Auth;
}

export function initialiseFirebaseAuth() {
	const auth = ref();

	const firebase = new FirebaseWrapper();

	provide(injectionKeys.FIREBASE_AUTH, {
		firebase
	});

	firebase.init();
}

export function useFirebaseAuth() {
	const api = inject(injectionKeys.FIREBASE_AUTH);

	console.log({ api });

	watch(
		() => api,
		() => {
			console.log(api);
		},
		{ deep: true }
	);
	const auth = ref();

	const init = async () => {};

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
