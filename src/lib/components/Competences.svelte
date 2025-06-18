<script>
	import '$lib/styles/glassmorphism.css';
	import SkillPopup from './SkillPopup.svelte';
	
	let selectedSkill = null;
	let showPopup = false;

	const skillsData = {
		'Programmation': {
			title: 'Programmation',
			categories: [
				{
					name: 'Logicielle',
					skills: ['C', 'Java', 'Kotlin', 'Python']
				},
				{
					name: 'Web',
					skills: ['HTML/CSS', 'JavaScript', 'Node.js', 'PHP', 'Svelte', 'Symfony', 'TypeScript', 'Vue.js']
				}
			]
		},
		'Base de données': {
			title: 'Base de données',
			categories: [
				{
					name: 'Langages',
					skills: ['SQL', 'PL/SQL', 'MongoDB', 'Clickhouse', 'PostgreSQL']
				},
				{
					name: 'Outils',
					skills: ['SQL Developer', 'phpMyAdmin']
				}
			]
		},
		'Analyse et conception': {
			title: 'Analyse et conception',
			categories: [
				{
					name: 'Outils',
					skills: ['PowerAMC', 'Power BI']
				}
			]
		},
		'Logiciel Microsoft': {
			title: 'Logiciel Microsoft',
			categories: [
				{
					name: 'Suite Office',
					skills: ['Word', 'Excel', 'PowerPoint']
				},
				{
					name: 'Développement',
					skills: ['GitHub', 'VSCode']
				}
			]
		},
		'Logiciel Adobe': {
			title: 'Logiciel Adobe',
			categories: [
				{
					name: 'Design & Vidéo',
					skills: ['Photoshop', 'Premiere Pro', 'After Effect (notions)', 'Illustrator (notions)']
				}
			]
		},
		'Gestion de projet': {
			title: 'Gestion de projet',
			categories: [
				{
					name: 'Méthodologies',
					skills: ['Agile', 'UML']
				}
			]
		},
		'Et bien d\'autres...': {
			title: 'Autres compétences',
			categories: [
				{
					name: 'Logiciels',
					skills: ['Blender', 'Eclipse', 'IntelliJ IDEA']
				},
				{
					name: 'Systèmes',
					skills: ['Linux', 'Windows']
				}
			]
		}
	};

	function openSkillPopup(skillName) {
		selectedSkill = skillsData[skillName];
		showPopup = true;
	}

	function closePopup() {
		showPopup = false;
		selectedSkill = null;
	}
</script>

<section
	id="Mes compétences"
	class="relative z-[2] flex min-h-screen items-center justify-center px-10 py-28 transition-colors duration-500"
	aria-label="Mes compétences"
>
	<div class="section-background competences-bg"></div>
	<div class="mx-auto flex w-full max-w-6xl items-center justify-center text-center">
		<div class="skills-grid">
			<button
				class="glassmorphism-panel skill-button content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Programmation')}
			>
				Programmation
			</button>
			<button
				class="glassmorphism-panel skill-button content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Base de données')}
			>
				Base de données
			</button>
			<button
				class="glassmorphism-panel skill-button content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Analyse et conception')}
			>
				Analyse et conception
			</button>
			<button
				class="glassmorphism-panel skill-button content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Logiciel Microsoft')}
			>
				Logiciel Microsoft
			</button>
			<button
				class="glassmorphism-panel skill-button content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Logiciel Adobe')}
			>
				Logiciel Adobe
			</button>
			<button
				class="glassmorphism-panel skill-button content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Gestion de projet')}
			>
				Gestion de projet
			</button>
			<button
				class="glassmorphism-panel skill-button last-skill content-center rounded-2xl px-6 py-12 text-3xl transition-all duration-300 hover:scale-105"
				on:click={() => openSkillPopup('Et bien d\'autres...')}
			>
				Et bien d'autres...
			</button>
		</div>
	</div>

	<SkillPopup 
		show={showPopup} 
		skill={selectedSkill} 
		on:close={closePopup} 
	/>
</section>

<style>
	.section-background {
		position: absolute;
		top: -50vh;
		left: 0;
		width: 100%;
		height: 200vh;
		z-index: 0;
		pointer-events: none;
	}

	.competences-bg {
		background: radial-gradient(circle at 95% 50%, rgba(58, 16, 62, 0.6) 0%, transparent 100vh);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2.5rem;
	}

	.last-skill {
		grid-column: 2;
	}

	@media screen and (max-width: 1024px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.last-skill {
			grid-column: 1 / -1;
		}
	}

	@media screen and (max-width: 767px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}

		.last-skill {
			grid-column: 1;
		}
	}
</style>
