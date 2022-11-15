<template>
	<section>
		<RbContainer class="py-8">
			<RbFlex align="stretch" wrap="wrap">
				<RbFlexItem class="md:basis-2/3 basis-full p-4">
					<RbCard class="bg-slate-800 p-4 rounded shadow-lg h-full">
						<h2>All about me</h2>
						<p class="my-4">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
							ipsam dolorum fuga cupiditate? Provident sunt voluptas reiciendis
							culpa similique velit maxime quas saepe reprehenderit voluptates
							vitae quae exercitationem, aliquam numquam ratione, repellendus
							repudiandae hic expedita autem? Accusantium, nemo libero est quos
							explicabo magni culpa corrupti id enim, aliquid et nostrum alias
							nam itaque omnis doloribus reiciendis eius ipsum minus ad eaque?
							Nam amet perferendis magni pariatur eligendi accusamus ullam a
							molestias officiis, dolor assumenda accusantium totam ex eos
							veniam quam sit minima ipsam! Debitis dolor inventore eligendi
							similique quod labore, neque vel saepe voluptates totam, ratione
							asperiores expedita maxime. Minima!
						</p>
					</RbCard>
				</RbFlexItem>
				<RbFlexItem class="md:basis-1/3 basis-full p-4">
					<RbCard class="bg-slate-800 p-4 rounded shadow-lg h-full">
						<h2>Skills</h2>
						<RbFlex wrap="wrap" class="mt-4">
							<RbPill v-for="skill of skills" class="mr-2 mb-2">{{
								skill
							}}</RbPill>
						</RbFlex>
					</RbCard>
				</RbFlexItem>
			</RbFlex>
		</RbContainer>
	</section>
</template>
<script setup lang="ts">
const skills = [
	'vue',
	'react',
	'go',
	'C#',
	'javascript',
	'typescript',
	'mongodb',
	'firestore',
	'angular',
	'sql',
	'scss',
	'html'
];
</script>
