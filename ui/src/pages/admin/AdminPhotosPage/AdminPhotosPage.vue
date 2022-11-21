<template>
	<p>Photos</p>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import adminPhotosService from '../../../features/admin/photos/adminPhotosService';

onMounted(async () => {
	await load();
});

const load = async () => {
	const photos = await adminPhotosService.get();
};
</script>
