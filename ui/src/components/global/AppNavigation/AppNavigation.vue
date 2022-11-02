<template>
	<div
		id="app-navigation"
		class="w-full flex justify-end flex-wrap md:flex-nowrap"
	>
		<div class="p-2">
			<RbIconButton
				icon="fa-solid fa-bars"
				v-if="isMobile"
				@click="toggleNavigation"
			/>
		</div>
		<Transition name="bounce">
			<div
				v-if="navState === NavState.OPEN"
				class="md:flex md:justify-end w-full md:w-auto origin-top absolute md:relative left-0 top-full shadow-lg"
			>
				<nav
					class="mx-4 md:mx-0 bg-slate-800 md:bg-transparent bg-opacity-90 rounded-b-lg backdrop-blur-lg"
				>
					<ul
						class="md:flex justify-center md:justify-end items-center gap-4 grow mb-4 md:mb-0"
					>
						<AppNavigationLink to="/" @click="toggleNavigation"
							>Home</AppNavigationLink
						>
						<AppNavigationLink to="/blog" @click="toggleNavigation"
							>Blog</AppNavigationLink
						>
						<AppNavigationLink to="/photos" @click="toggleNavigation"
							>Photos</AppNavigationLink
						>
						<AppNavigationLink to="/cv" @click="toggleNavigation"
							>CV</AppNavigationLink
						>
						<AppNavigationLink to="/projects" @click="toggleNavigation"
							>Projects</AppNavigationLink
						>
					</ul>
				</nav>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import AppNavigationLink from './AppNavigationLink/AppNavigationLink.vue';
import { NavState } from './navState';

const { width } = useWindowSize();

const navState = ref<NavState>(NavState.OPEN);

const isMobile = computed(() => width.value <= 768);

onMounted(() => {
	navState.value = width.value > 768 ? NavState.OPEN : NavState.CLOSED;
});

const toggleNavigation = () => {
	if (width.value > 768) {
		return;
	}
	navState.value =
		navState.value === NavState.CLOSED ? NavState.OPEN : NavState.CLOSED;
};
</script>

<style scoped>
.bounce-enter-active {
	animation: bounce-in 0.3s ease-in-out;
}
.bounce-leave-active {
	animation: bounce-in 0.3s reverse ease-in-out;
}
@keyframes bounce-in {
	0% {
		transform: scaleY(0);
	}
	50% {
		transform: scaleY(1.25);
	}
	100% {
		transform: scaleY(1);
	}
}
</style>
