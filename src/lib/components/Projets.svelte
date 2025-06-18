<script>
	import '$lib/styles/glassmorphism.css';
	import { onMount, onDestroy } from 'svelte';
	import { createConstructionScene } from '$lib/three/ConstructionScene.js';
	import InfoPopup from './InfoPopup.svelte';
	
	// References for Three.js scene
	let container;
	let sceneController;
	let isInteracting = false;
	let activeInteractionId = null;
	
	// État de la popup d'information
	let showInfoPopup = false;
	let currentProjectInfo = null;

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
	
	// Fonction pour afficher les informations du projet actuel
	function showProjectInfo() {
		if (sceneController && sceneController.screenContentManager && activeInteractionId) {
			const screenId = sceneController.screenContentManager.getActiveScreenId(activeInteractionId);
			if (screenId) {
				currentProjectInfo = sceneController.screenContentManager.getCurrentProjectInfo(screenId);
				if (currentProjectInfo) {
					showInfoPopup = true;
				}
			}
		}
	}
	
	// Fonction pour fermer la popup d'information
	function closeInfoPopup() {
		showInfoPopup = false;
		currentProjectInfo = null;
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
				</button>
						<!-- Bouton d'information / fermeture -->
				<button
					class="info-btn"
					class:is-close={showInfoPopup}
					on:click={showInfoPopup ? closeInfoPopup : showProjectInfo}
					aria-label={showInfoPopup ? "Fermer les informations" : "Informations sur le projet"}
					title={showInfoPopup ? "Fermer les informations" : "Voir les détails du projet"}
				>
					{#if showInfoPopup}
						<!-- Icône de fermeture -->
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{:else}
						<!-- Icône d'information -->
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
							<path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{/if}
				</button>
			{/if}
			
			<!-- Barre latérale d'informations -->
			<InfoPopup bind:isVisible={showInfoPopup} projectInfo={currentProjectInfo} on:close={closeInfoPopup} />
		</div>	</div>
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
	.info-btn {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 1600;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 30%, rgba(59, 130, 246, 0.1) 100%);
		border: 1px solid rgba(59, 130, 246, 0.4);
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
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
	}
	
	.info-btn.is-close {
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.25) 30%, rgba(239, 68, 68, 0.1) 100%);
		border: 1px solid rgba(239, 68, 68, 0.4);
		box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
		transform: rotate(90deg);
	}
	.exit-interaction-btn:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.1) 100%);
		transform: scale(1.05);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}
	.info-btn:hover {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.35) 30%, rgba(59, 130, 246, 0.15) 100%);
		transform: scale(1.05);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
	}
	
	.info-btn.is-close:hover {
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.35) 30%, rgba(239, 68, 68, 0.15) 100%);
		transform: rotate(90deg) scale(1.05);
		box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
	}
	.exit-interaction-btn:focus {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}
	.info-btn:focus {
		outline: 2px solid rgba(59, 130, 246, 0.5);
		outline-offset: 2px;
	}
	
	.info-btn.is-close:focus {
		outline: 2px solid rgba(239, 68, 68, 0.5);
		outline-offset: 2px;
	}
		.exit-interaction-btn:active,
	.info-btn:active {
		transform: scale(0.95);
	}
	
	.info-btn.is-close:active {
		transform: rotate(90deg) scale(0.95);
	}
	@media screen and (max-width: 767px) {
		.exit-interaction-btn,
		.info-btn {
			top: 15px;
			width: 42px;
			height: 42px;
		}
		
		.exit-interaction-btn {
			left: 15px;
		}
		
		.info-btn {
			right: 15px;
		}
	}
</style>
