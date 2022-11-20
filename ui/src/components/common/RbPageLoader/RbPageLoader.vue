<template>
	<div
		class="fixed top-0 left-0 z-50 bg-white bg-opacity-5 w-full h-full backdrop-filter backdrop-blur-sm"
	>
		<RbFlex justify="center" align="center" class="h-full">
			<span class="loader"></span>
		</RbFlex>
	</div>
</template>

<style scoped>
.loader {
	width: 256px;
	height: 256px;
	display: inline-block;
	position: relative;
}
.loader::after,
.loader::before {
	content: '';
	box-sizing: border-box;
	width: 256px;
	height: 256px;
	border-radius: 50%;
	border: 5px solid #2563eb;
	position: absolute;
	left: 0;
	top: 0;
	animation: animloader 2s linear infinite;
}
.loader::after {
	animation-delay: 1s;
}

@keyframes animloader {
	0% {
		transform: scale(0);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}
</style>
