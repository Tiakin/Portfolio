<script>
	import '$lib/styles/glassmorphism.css';
</script>

<section
	id="Mes compétences"
	class="relative z-[1] flex min-h-screen items-center justify-center px-10 py-28 transition-colors duration-500"
>
	<div class="section-background competences-bg"></div>
	<div class="mx-auto flex w-full max-w-6xl items-center justify-center text-center">
		<div class="skills-grid">
			<div class="glassmorphism-panel content-center rounded-2xl px-6 py-12 text-3xl">
				Programmation
			</div>
			<div class="glassmorphism-panel content-center rounded-2xl px-6 py-12 text-3xl">
				Base de données
			</div>
			<div class="glassmorphism-panel content-center rounded-2xl px-6 py-12 text-3xl">
				Analyse et conception
			</div>
			<div class="glassmorphism-panel content-center rounded-2xl px-6 py-12 text-3xl">
				Logiciel Microsoft
			</div>
			<div class="glassmorphism-panel content-center rounded-2xl px-6 py-12 text-3xl">
				Logiciel Adobe
			</div>
			<div class="glassmorphism-panel content-center rounded-2xl px-6 py-12 text-3xl">
				Gestion de projet
			</div>
			<div class="glassmorphism-panel last-skill content-center rounded-2xl px-6 py-12 text-3xl">
				Et bien d'autres...
			</div>
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
