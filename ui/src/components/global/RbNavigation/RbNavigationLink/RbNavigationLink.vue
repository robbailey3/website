<template>
	<li>
		<router-link
			:to="to"
			active-class="text-blue-300 "
			class="p-2 md:p-4 block hover:text-blue-500"
			><slot></slot
		></router-link>
	</li>
</template>

<script setup lang="ts">
defineProps<{ to: string }>();
</script>
