<template>
	<div id="app-navigation" class="w-full">
		<nav class="flex justify-end">
			<ul class="flex justify-center md:justify-end items-center gap-4 grow">
				<AppNavigationLink to="/">Home</AppNavigationLink>
				<AppNavigationLink to="/blog">Blog</AppNavigationLink>
				<AppNavigationLink to="/photos">Photos</AppNavigationLink>
				<AppNavigationLink to="/cv">CV</AppNavigationLink>
				<AppNavigationLink to="/projects">Projects</AppNavigationLink>
			</ul>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import AppNavigationLink from './AppNavigationLink/AppNavigationLink.vue';
import { NavState } from './navState';

const { width } = useWindowSize();

const isOpen = ref<NavState>(NavState.OPEN);

onMounted(() => {
	isOpen.value = width.value > 768 ? NavState.OPEN : NavState.CLOSED;
});

watch(
	() => width.value,
	() => {
		console.log(width.value);
	}
);
</script>
