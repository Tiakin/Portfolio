<script>
	import '$lib/styles/glassmorphism.css';
	import { onMount, onDestroy } from 'svelte';
	import { createConstructionScene } from '$lib/three/ConstructionScene.js';
	
	// References for Three.js scene
	let container;
	let sceneController;
	let isInteracting = false;
	let activeInteractionId = null;

	// Callback pour recevoir les changements d'état d'interaction
	function handleInteractionStateChange(interacting, interactionId) {
		isInteracting = interacting;
		activeInteractionId = interactionId;
	}

	// Fonction pour quitter l'interaction
	function exitInteraction() {
		if (sceneController && sceneController.interactionManager) {
			sceneController.interactionManager.stopInteraction();
		}
	}

	onMount(() => {
		if (!container) return;

		// Delay to ensure DOM is ready
		setTimeout(() => {
			try {
				sceneController = createConstructionScene(container, handleInteractionStateChange);
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
	class="relative z-[1] min-h-screen px-4 py-12 transition-colors duration-500"
>
	<div class="section-background projets-bg"></div>
	<div class="mx-auto flex min-h-screen w-full flex-col items-center justify-center text-center">		<div bind:this={container} class="three-container">
			<!-- Bouton de sortie d'interaction -->
			{#if isInteracting}
				<button
					class="exit-interaction-btn"
					on:click={exitInteraction}
					aria-label="Quitter l'interaction"
					title="Quitter l'interaction (Échap)"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>			{/if}
		</div>
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
		pointer-events: none;
	}

	.projets-bg {
		background: radial-gradient(circle at 5% 50%, rgba(66, 63, 14, 0.6) 0%, transparent 100vh);
	}
	
	.three-container {
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		height: 85vh; /* Utilisation d'une hauteur relative à la vue */
		width: 100%;
		max-height: calc(100vh - 5rem); /* Pour éviter que ça déborde trop */
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
	}

	.exit-interaction-btn {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 1000;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0.05) 100%);
		border: 1px solid rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(12px);
		border-radius: 12px;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.exit-interaction-btn:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.1) 100%);
		transform: scale(1.05);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	.exit-interaction-btn:focus {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}
	.exit-interaction-btn:active {
		transform: scale(0.95);
	}

	@media screen and (max-width: 767px) {
		.exit-interaction-btn {
			top: 15px;
			left: 15px;
			width: 42px;
			height: 42px;
		}
	}
</style>
