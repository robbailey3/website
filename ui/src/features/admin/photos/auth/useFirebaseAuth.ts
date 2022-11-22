import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
	signInWithEmailAndPassword,
	getAuth,
	Auth,
	setPersistence,
	browserLocalPersistence,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import { InjectionKey } from 'vue';
import { injectionKeys } from '../../../../injectionKeys';
import { FirebaseWrapper } from './firebaseWrapper';

interface FirebaseAuth {
	auth: Auth;
}

const injectionKey: InjectionKey<{ firebase: FirebaseWrapper }> =
	Symbol('FIREBASE_AUTH');

export function initialiseFirebaseAuth() {
	const firebase = new FirebaseWrapper();

	provide(injectionKey, {
		firebase
	});

	firebase.init();
}

export function useFirebaseAuth() {
	const api = inject(injectionKey);

	if (!api) {
		throw new Error('useFirebaseAuth() called outside of setup');
	}

	const { firebase } = api;

	const user = ref<User | null>();

	const $userSubscription = firebase.$user.subscribe({
		next: (u) => {
			user.value = u;
		}
	});

	onUnmounted(() => {
		$userSubscription?.unsubscribe();
	});

	const login = async (email: string, password: string) => {
		return await firebase.login(email, password);
	};

	const getIdToken = async () => {
		return await firebase.getIdToken();
	};

	const logout = async () => {
		return await firebase.logout();
	};

	return { login, logout, getIdToken, user };
}
