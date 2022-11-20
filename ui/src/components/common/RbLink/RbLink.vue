<template>
	<a
		:href="href"
		:target="target"
		:rel="rel"
		class="text-blue-300 font-bold hover:underline"
	>
		<slot></slot>
	</a>
</template>

<script lang="ts" setup>
defineProps<{
	href: string;
	target?: '_blank' | '_parent' | '_self' | '_top';
	rel?: string;
}>();
</script>
