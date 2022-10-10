<template>
	<li>
		<router-link
			:to="to"
			active-class="text-blue-400"
			class="p-4 block hover:text-cyan-700 font-bold"
			><slot></slot
		></router-link>
	</li>
</template>

<script setup lang="ts">
defineProps<{ to: string }>();
</script>
