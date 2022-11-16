<script setup lang="ts">
import RbHeader from './components/global/RbHeader/RbHeader.vue';
import firebase from './services/firebase';

onMounted(async () => {
	await firebase.init();
});
</script>

<template>
	<RbHeader />
	<main id="main-content">
		<RouterView />
	</main>
</template>

<style scoped></style>
