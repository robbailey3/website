<script setup lang="ts">
import RbHeader from './components/global/RbHeader/RbHeader.vue';
import { initialiseFirebaseAuth } from './features/admin/photos/auth/useFirebaseAuth';

onMounted(async () => {
	await initialiseFirebaseAuth();
});
</script>

<template>
	<RbHeader />
	<main id="main-content">
		<RouterView />
	</main>
</template>

<style scoped></style>
