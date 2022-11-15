<template>
	<section>
		<Container>
			<div
				class="flex flex-col h-screen w-full justify-center items-center flex-wrap"
			>
				<div class="w-full text-center max-w-screen-md mx-auto">
					<h1 class="text-8xl">
						<span class="text-teal-600">Hello</span>
					</h1>
					<p class="text-4xl mt-8">
						My name is Rob and I am a software engineer
					</p>
				</div>
				<div
					class="px-8 py-2 text-center text-3xl border border-cyan-400 rounded mt-16"
				>
					<h2>Find me on</h2>
					<ul class="flex my-2 gap-4 justify-center">
						<li>
							<a
								class="block hover:text-cyan-400"
								href="https://github.com/robbailey3"
								rel="noopener noreferrer"
								target="_blank"
								><span class="sr-only">GitHub</span
								><font-awesome-icon icon="fa-brands fa-github"
							/></a>
						</li>
						<li>
							<a
								class="block hover:text-cyan-400"
								href="https://twitter.com/rob_bailey3"
								rel="noopener noreferrer"
								target="_blank"
								><span class="sr-only">Twitter</span>
								<font-awesome-icon icon="fa-brands fa-twitter" />
							</a>
						</li>
						<li>
							<a
								class="block hover:text-cyan-400"
								href="https://www.linkedin.com/in/robbailey3/"
								rel="noopener noreferrer"
								target="_blank"
								><span class="sr-only">LinkedIn</span>
								<font-awesome-icon icon="fa-brands fa-linkedin" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</Container>
	</section>
</template>

<script lang="ts" setup></script>
