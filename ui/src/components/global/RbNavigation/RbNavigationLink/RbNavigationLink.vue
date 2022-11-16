<template>
	<li>
		<router-link
			:to="to"
			active-class="text-cyan-300"
			class="p-2 md:p-4 block hover:text-cyan-500 font-bold"
			><slot></slot
		></router-link>
	</li>
</template>

<script setup lang="ts">
defineProps<{ to: string }>();
</script>
