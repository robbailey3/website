<template>
	<section>
		<RbContainer class="py-8">
			<RbFlex align="stretch" wrap>
				<RbFlexItem class="md:basis-2/3 basis-full">
					<RbCard class="bg-neutral-800 p-4 rounded shadow-lg h-full">
						<h2>All about me</h2>
						<p class="my-4">
							I&apos;m a software engineer based in Nottingham, UK working with
							a range of front-end and back-end technologies to make cool
							things. Currently working at
							<RbLink
								href="https://www.netcall.com/"
								target="_blank"
								rel="noopener noreferrer"
								>Netcall</RbLink
							>
							helping to build the latest contact centre solution with C# and
							Vue.
						</p>
					</RbCard>
				</RbFlexItem>
				<RbFlexItem class="md:basis-1/3 basis-full p-4">
					<RbCard class="bg-neutral-700 p-4 h-full">
						<h2>Skills</h2>
						<RbFlex wrap class="mt-4">
							<RbPill v-for="skill of skills" class="mr-2 mb-2">{{
								skill
							}}</RbPill>
						</RbFlex>
					</RbCard>
				</RbFlexItem>
			</RbFlex>
			<RbFlex>
				<RbFlexItem class="basis-full my-8">
					<RbCard class="bg-neutral-800 p-4 h-full">
						<RbFlex>
							<RbFlexItem class="md:basis-1/2 basis-full p-4">
								<h2>Currently learning</h2>
								<RbFlex align="center" class="mt-8">
									<RbTechLogo tech="go" :height="96" :width="96" />
									<p>Go</p>
								</RbFlex>
							</RbFlexItem>
							<RbFlexItem class="md:basis-1/2 basis-full p-4">
								<h2>Currently working on</h2>
								<p>
									This website with a backend built in Go and Vue on the
									front-end
								</p>
							</RbFlexItem>
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

// TODO: Probably store all the text in the database so I can fiddle with it when I want.
</script>
