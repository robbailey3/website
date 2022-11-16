<template>
	<a
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:p-4 focus:bg-slate-800 focus:z-50"
		id="skip-to-content"
		tabindex="0"
		href="#main-content"
	>
		Skip to content
	</a>
	<header
		class="shadow-lg fixed left-0 top-0 w-full z-40 bg-slate-800 bg-opacity-25 backdrop-blur-sm"
	>
		<RbContainer>
			<RbNavigation></RbNavigation>
		</RbContainer>
	</header>
</template>

<script setup lang="ts">
import RbNavigation from '../RbNavigation/RbNavigation.vue';
</script>
