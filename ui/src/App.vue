<script setup lang="ts">
import RbHeader from './components/global/RbHeader/RbHeader.vue';
import { initialiseFirebaseAuth } from './features/admin/auth/useFirebaseAuth';

const isLoaded = ref(false);

onMounted(() => {
	isLoaded.value = false;
	initialiseFirebaseAuth();
	nextTick(() => {
		isLoaded.value = true;
	});
});
</script>

<template>
	<RbPageLoader v-if="!isLoaded" />
	<template v-else>
		<RbHeader />
		<main id="main-content">
			<RouterView />
		</main>
	</template>
</template>

<style scoped></style>
