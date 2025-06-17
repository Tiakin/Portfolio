<script>
	import { createEventDispatcher } from 'svelte';

	export let show = false;
	export let skill = null;

	const dispatch = createEventDispatcher();

	function closePopup() {
		dispatch('close');
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closePopup();
		}
	}
</script>

{#if show && skill}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div 
		class="popup-overlay" 
		role="dialog" 
		aria-modal="true" 
		aria-labelledby="popup-title"
		on:click={closePopup}
		on:keydown={handleKeydown}
		tabindex="-1"
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div 
			class="popup-content glassmorphism-panel" 
			role="document"
			on:click|stopPropagation
			on:keydown|stopPropagation
		>
			<div class="popup-header">
				<h2 id="popup-title" class="popup-title">{skill.title}</h2>
				<button 
					class="close-button" 
					on:click={closePopup}
					aria-label="Fermer la popup"
					type="button"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
			<div class="popup-body">
				{#each skill.categories as category}
					<div class="category-section">
						<h3 class="category-title">{category.name} :</h3>
						<div class="skills-list">
							{#each category.skills as skillItem}
								<span class="skill-tag">{skillItem}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Popup Styles */
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(5px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		animation: fadeIn 0.3s ease-out;
	}

	.popup-content {
		max-width: 600px;
		width: 90%;
		max-height: 80vh;
		overflow-y: auto;
		margin: 2rem;
		animation: slideIn 0.3s ease-out;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.popup-title {
		font-size: 1.8rem;
		font-weight: 600;
		margin: 0;
		color: #ffffff;
	}

	.close-button {
		background: none;
		border: none;
		color: #ffffff;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 50%;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.1);
	}

	.close-button:focus {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}

	.popup-body {
		padding: 2rem;
	}

	.category-section {
		margin-bottom: 2rem;
	}

	.category-section:last-child {
		margin-bottom: 0;
	}

	.category-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #ffffff;
		margin: 0 0 1rem 0;
		text-align: left;
	}

	.skills-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.skill-tag {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		font-size: 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.2s ease;
	}

	.skill-tag:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-2rem) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media screen and (max-width: 1024px) {
		.popup-content {
			width: 95%;
			margin: 1rem;
		}

		.popup-header {
			padding: 1rem 1.5rem;
		}

		.popup-body {
			padding: 1.5rem;
		}

		.popup-title {
			font-size: 1.5rem;
		}
	}

	@media screen and (max-width: 767px) {
		.popup-content {
			width: 95%;
			margin: 0.5rem;
			max-height: 90vh;
		}

		.popup-header {
			padding: 1rem;
		}

		.popup-body {
			padding: 1rem;
		}

		.popup-title {
			font-size: 1.3rem;
		}

		.category-title {
			font-size: 1.1rem;
		}

		.skill-tag {
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
		}
	}
</style>
