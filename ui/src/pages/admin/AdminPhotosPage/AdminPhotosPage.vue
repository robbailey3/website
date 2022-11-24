<template>
	<div v-if="loadingState === LoadingState.LOADED">
		<template v-for="photo of photos">
			<h1>{{ photo.caption }}</h1>
			<img :src="getPhotoSrc(photo.id)" alt="" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import { useAdminPhotos } from '@features/admin/photos/useAdminPhotos';
import { LoadingState } from '@models/LoadingState';

const { loadPhotos, loadingState, photos } = useAdminPhotos();

onMounted(() => {
	loadPhotos(100, 0);
});

const getPhotoSrc = (id: string) => {
	return `http://localhost:8080/api/photos/${id}`;
};
</script>
