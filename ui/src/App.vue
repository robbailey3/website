<script setup lang="ts">
import AppHeader from './components/global/AppHeader/AppHeader.vue';
import firebase from './services/firebase';

onMounted(async () => {
	await firebase.init();
});
</script>

<template>
	<AppHeader />
	<RouterView />
</template>

<style scoped></style>
