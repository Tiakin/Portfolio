<script>
	import '$lib/styles/glassmorphism.css';
	import { onMount, onDestroy } from 'svelte';
	import { createConstructionScene } from '$lib/three/ConstructionScene.js';

	// References for Three.js scene
	let container;
	let sceneController;

	onMount(() => {
		if (!container) return;

		// Delay to ensure DOM is ready
		setTimeout(() => {
			try {
				sceneController = createConstructionScene(container);
			} catch (error) {
				console.error('Error initializing Three.js scene:', error);
			}
		}, 100);
	});

	onDestroy(() => {
		if (sceneController) {
			sceneController.dispose();
		}
	});
</script>

<section
	id="Mes projets"
	class="relative z-[1] min-h-screen px-10 py-28 transition-colors duration-500"
>
	<div class="section-background projets-bg"></div>
	<div class="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center text-center">
		<div bind:this={container} class="three-container"></div>
	</div>
</section>

<style>
	.section-background {
		position: absolute;
		top: -50vh;
		left: 0;
		width: 100%;
		height: 200vh;
		z-index: -1;
	}

	.projets-bg {
		background: radial-gradient(circle at 5% 50%, rgba(66, 63, 14, 0.6) 0%, transparent 100vh);
	}

	.three-container {
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		height: 700px;
		width: 100%;
	}
</style>
