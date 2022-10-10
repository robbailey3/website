<template>
	<section>
		<AppContainer>
			<div class="flex h-screen w-full justify-center items-center flex-wrap">
				<div class="w-1/2 text-center grow">
					<h1 class="text-8xl">Rob Bailey</h1>
				</div>
				<div class="w-1/2 text-center grow">
					<p>I am a Full-Stack developer.</p>
				</div>
				<div
					class="px-8 py-2 text-center text-3xl border border-cyan-400 rounded"
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
					</ul>
				</div>
			</div>
		</AppContainer>
	</section>
</template>

<script lang="ts" setup></script>
