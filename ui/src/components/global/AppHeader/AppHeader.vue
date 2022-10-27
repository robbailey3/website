<template>
	<a
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:p-4"
		id="skip-to-content"
	>
		Skip to content
	</a>
	<header class="shadow-lg fixed left-0 top-0 w-full z-50">
		<Container>
			<AppNavigation></AppNavigation>
		</Container>
	</header>
</template>

<script setup lang="ts">
import AppNavigation from '../AppNavigation/AppNavigation.vue';
</script>
