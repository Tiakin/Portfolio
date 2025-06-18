<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let isVisible = false;
	export let projectInfo = null;
	
	function closePopup() {
		dispatch('close');
	}
		function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			closePopup();
		}
	}
	
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closePopup();
		}
	}
</script>

{#if isVisible && projectInfo}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div class="sidebar-backdrop" on:click={handleBackdropClick} on:keydown={handleKeydown} role="dialog" aria-modal="true" tabindex="-1">
		<div class="sidebar-container" class:visible={isVisible}>
			<div class="sidebar-header">
				<h2 class="sidebar-title">{projectInfo.title}</h2>
			</div>
			
			<div class="sidebar-content">
				{#if projectInfo.description}
					<div class="description-section">
						<h3>Description</h3>
						<p>{projectInfo.description}</p>
					</div>
				{/if}
				{#if projectInfo.technologies && projectInfo.technologies.length > 0}
					<div class="technologies-section">
						<h3>Technologies utilisées</h3>
						<div class="tech-tags">
							{#each projectInfo.technologies as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>
				{/if}
				{#if projectInfo.skills && projectInfo.skills.length > 0}
					<div class="skills-section">
						<h3>Compétences développées</h3>
						<ul class="skills-list">
							{#each projectInfo.skills as skill}
								<li>
									<div class="skill-name">{skill.name}</div>
									{#if skill.description}
										<div class="skill-desc">{skill.description}</div>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>	.sidebar-backdrop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
		z-index: 5;
		padding: 0;
		box-sizing: border-box;
		pointer-events: auto;
	}
	.sidebar-container {
		position: absolute;
		top: 0;
		right: 0;
		width: 480px;
		height: 100%;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.75) 100%);
		border-left: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(16px);
		transform: translateX(100%);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow-y: auto;
		box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
	}
	
	.sidebar-container.visible {
		transform: translateX(0);
	}
	
	.sidebar-header {
		padding: 24px 24px 16px 24px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		flex-shrink: 0;
	}
	
	.sidebar-title {
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}
	
	.sidebar-content {
		padding: 24px;
		color: white;
		flex: 1;
		overflow-y: auto;
	}
    .description-section,
	.technologies-section,
	.skills-section {
		margin-bottom: 24px;
	}
	
	.description-section:last-child,
	.technologies-section:last-child,
	.skills-section:last-child {
		margin-bottom: 0;
	}
	
	h3 {
		color: white;
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 12px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		padding-bottom: 8px;
	}
	
	p {
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		margin: 0;
	}
	
	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	
	.tech-tag {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.skills-list {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: left;
	}
	
	.skills-list li {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 16px;
		padding-left: 16px;
		position: relative;
	}
	
	.skills-list li:before {
		content: '•';
		color: rgba(255, 255, 255, 0.6);
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.skills-list li:last-child {
		margin-bottom: 0;
	}
	
	.skill-name {
		color: white;
		font-weight: 600;
		margin-bottom: 4px;
	}
	
	.skill-desc {
		color: rgba(255, 255, 255, 0.7);
        font-weight: normal;
		line-height: 1.4;
	}
	
	@media screen and (max-width: 767px) {
		.sidebar-container {
			width: 100%;
			right: 0;
		}
		
		.sidebar-header {
			padding: 20px 20px 12px 20px;
		}
		
		.sidebar-title {
			font-size: 1.3rem;
		}
		
		.sidebar-content {
			padding: 20px;
		}
		
		.tech-tags {
			gap: 6px;
		}
		
		.tech-tag {
			padding: 4px 10px;
			font-size: 0.8rem;
		}
	}
</style>
