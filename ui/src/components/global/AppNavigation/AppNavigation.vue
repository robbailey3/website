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
import AppNavigationLink from './AppNavigationLink/AppNavigationLink.vue';
</script>
