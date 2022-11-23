import { LoadingState } from '../../../models/LoadingState';
import { useHttp } from '../../http/useHttp';
import { useFirebaseAuth } from '../auth/useFirebaseAuth';
import { Photo } from './models/Photo';

export function useAdminPhotos() {
	const { getIdToken } = useFirebaseAuth();
	const { httpGet, setAuthToken } = useHttp();

	const photos = ref<Photo[]>([]);

	onMounted(async () => {
		const token = await getIdToken();

		if (!token) {
			throw new Error('User is not logged in');
		}

		setAuthToken(token);
	});

	const loadingState = ref<LoadingState>(LoadingState.LOADING);

	const loadPhotos = async (limit: number, offset: number) => {
		loadingState.value = LoadingState.LOADING;
		try {
			photos.value = await httpGet<Photo[]>('/photos', {
				limit,
				offset
			});
			loadingState.value = LoadingState.LOADED;
		} catch (error) {
			loadingState.value = LoadingState.ERROR;
			throw error;
		}
	};

	return { loadPhotos, loadingState };
}
