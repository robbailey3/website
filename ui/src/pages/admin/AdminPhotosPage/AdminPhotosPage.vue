<template>
	<p>Photos</p>
</template>

<script lang="ts" setup>
import { useAdminPhotos } from '@features/admin/photos/useAdminPhotos';

const { loadPhotos, loadingState } = useAdminPhotos();

onMounted(() => {
	loadPhotos(100, 0);
});
</script>
