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
				class="md:flex md:justify-end w-full md:w-auto origin-top absolute md:relative left-0 top-full"
			>
				<nav
					class="mx-4 md:mx-0 bg-neutral-800 md:bg-transparent bg-opacity-90 rounded-b-lg"
				>
					<ul
						class="md:flex justify-center md:justify-end items-center space-x-4 grow mb-4 md:mb-0"
					>
						<RbNavigationLink to="/" @click="toggleNavigation"
							>Home</RbNavigationLink
						>
						<RbNavigationLink to="/blog" @click="toggleNavigation"
							>Blog</RbNavigationLink
						>
						<RbNavigationLink to="/photos" @click="toggleNavigation"
							>Photos</RbNavigationLink
						>
						<RbNavigationLink to="/cv" @click="toggleNavigation"
							>CV</RbNavigationLink
						>
						<RbNavigationLink to="/experiments" @click="toggleNavigation"
							>Experiments</RbNavigationLink
						>
						<a
							v-if="isLoggedIn"
							@click="signOut"
							class="p-2 md:p-4 block hover:text-blue-500"
							>Sign Out</a
						>
					</ul>
				</nav>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import RbNavigationLink from './RbNavigationLink/RbNavigationLink.vue';
import { NavState } from './navState';
import { useFirebaseAuth } from '../../../features/admin/photos/auth/useFirebaseAuth';
import { sign } from 'crypto';

const { width } = useWindowSize();

const { user, logout } = useFirebaseAuth();

const navState = ref<NavState>(NavState.OPEN);

const isMobile = computed(() => width.value <= 768);

onMounted(() => {
	navState.value = width.value > 768 ? NavState.OPEN : NavState.CLOSED;
});

watch(
	() => width.value,
	(value, prev) => {
		if (prev > 768 && value < 768) {
			navState.value = NavState.CLOSED;
		}
		if (value > 768 && prev < 768) {
			navState.value = NavState.OPEN;
		}
	}
);

const toggleNavigation = () => {
	if (width.value > 768) {
		return;
	}
	navState.value =
		navState.value === NavState.CLOSED ? NavState.OPEN : NavState.CLOSED;
};

const isLoggedIn = computed(() => {
	console.log({ user: user.value });
	return user.value !== null && user.value !== undefined;
});

const signOut = async () => {
	await logout();
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
