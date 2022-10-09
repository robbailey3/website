<script setup lang="ts">
import PageHeader from './components/global/pageHeader/PageHeader.vue';
import firebase from './services/firebase';

onMounted(async () => {
	await firebase.init();
});
</script>

<template>
	<PageHeader />
	<RouterView />
</template>

<style scoped></style>
