<template>
	<div id="app-navigation" class="fixed z-50 top-0 left-0 w-full flex flex-col">
		<div class="flex justify-end">
			<AppNavigationToggle v-model="menuOpen" />
		</div>
		<Transition>
			<nav
				v-if="menuOpen"
				class="grow flex flex-col justify-center items-center origin-top"
			>
				<ul class="flex flex-col justify-center items-center gap-4 grow">
					<AppNavigationLink to="/">Home</AppNavigationLink>
					<AppNavigationLink to="/projects">Projects</AppNavigationLink>
				</ul>
			</nav>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import AppNavigationLink from './AppNavigationLink/AppNavigationLink.vue';
import AppNavigationToggle from './AppNavigationToggle/AppNavigationToggle.vue';

const menuOpen = ref(false);
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: height 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
	height: 0;
}
</style>
