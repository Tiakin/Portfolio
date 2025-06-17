<script>
	import '$lib/styles/glassmorphism.css';
</script>

<section
	id="Présentation"
	class="relative z-[1] min-h-screen px-10 py-28 transition-colors duration-500"
>
	<div class="section-background presentation-bg"></div>

	<section class="relative z-[1] flex min-h-screen items-center justify-center px-10 py-28">
		<div class="mx-auto grid gap-20 md:gap-32 xl:grid-cols-2">
			<div class="flex flex-col items-center justify-center gap-12 md:col-span-1">
				<a
					href="https://github.com/Tiakin"
					class="glassmorphism-button flex w-full items-center justify-center gap-4 rounded-2xl"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					<span class="text-4xl font-medium text-white">github.com/Tiakin</span>
				</a>
				<a
					href="#top"
					class="glassmorphism-button flex w-full items-center justify-center gap-4 rounded-2xl"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"
						/>
					</svg>
					<span class="text-4xl font-medium text-white">Mon CV</span>
				</a>
			</div>

			<div class="glassmorphism-panel max-w-3xl rounded-2xl px-14 py-12 md:col-span-1">
				<p class="mb-10 text-2xl text-white">
					Étudiant en recherche de stage pour la deuxième année de BUT Informatique parcours
					réalisation d'applications au sein du campus de La Doua (IUT Lyon 1).
				</p>
				<p class="mb-10 text-2xl text-white">
					Curieux, créatif, sérieux, je suis également passionné par l'informatique depuis mon plus
					jeune âge, ce qui m'a permis d'apprendre de nombreuses technologies en autodidacte.
				</p>
				<p class="text-2xl text-white">
					Je vous invite à explorer mon portfolio pour découvrir mon parcours, mes formations, mes
					compétences, ainsi que les projets que j'ai réalisés, qu'ils soient personnels ou issus de
					mon cursus scolaire. Vous y trouverez également mon github et mon CV.
				</p>
			</div>
		</div>
	</section>

	<section class="relative z-[1] flex min-h-screen items-center justify-center px-10 py-28">
		<div class="mx-auto w-full max-w-7xl">
			<div class="timeline">
				<!-- BUT Informatique -->
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="glassmorphism-panel rounded-2xl px-12 py-12">
						<span class="timeline-badge">En cours</span>
						<div class="flex flex-col md:flex-row md:items-start md:justify-between">
							<div class="mb-8 md:mb-0 md:pr-16">
								<h3 class="mb-5 text-4xl font-semibold">BUT Informatique</h3>
								<p class="text-2xl text-white/80">Parcours Réalisation d'Applications</p>
							</div>
							<div class="md:pl-10 md:text-right">
								<p class="text-2xl font-medium text-white/90">IUT Lyon 1 La Doua</p>
								<p class="mt-4 text-2xl text-white/80">Villeurbanne</p>
								<p class="mt-5 text-2xl font-light text-white/70 italic">2023 - 2026</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Bac STI2D -->
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="glassmorphism-panel rounded-2xl px-12 py-12">
						<div class="flex flex-col md:flex-row md:items-start md:justify-between">
							<div class="mb-8 md:mb-0 md:pr-16">
								<h3 class="mb-5 text-4xl font-semibold">Bac STI2D</h3>
								<p class="text-2xl text-white/80">Option SIN - Mention Très Bien</p>
							</div>
							<div class="md:pl-10 md:text-right">
								<p class="text-2xl font-medium text-white/90">Lycée Albert Camus</p>
								<p class="mt-4 text-2xl text-white/80">Rillieux-la-Pape</p>
								<p class="mt-5 text-2xl font-light text-white/70 italic">2021 - 2023</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
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

	.presentation-bg {
		background: radial-gradient(circle at 5% 50%, rgba(29, 83, 79, 0.6) 0%, transparent 100vh);
	}

	.timeline {
		position: relative;
		padding-left: 60px;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 6px;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
		border-radius: 8px;
	}

	.timeline-item {
		position: relative;
		margin-bottom: 6rem;
	}

	.timeline-item:last-child {
		margin-bottom: 0;
	}

	.timeline-marker {
		position: absolute;
		width: 28px;
		height: 28px;
		background-color: white;
		border-radius: 50%;
		left: -71px;
		top: 35px;
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
	}

	.timeline-badge {
		position: absolute;
		top: -16px;
		right: -16px;
		background: linear-gradient(135deg, rgba(29, 34, 79, 0.95), rgba(29, 34, 79, 0.7));
		color: white;
		font-size: 1.25rem;
		padding: 6px 18px;
		border-radius: 20px;
		font-weight: 600;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
	}

	@media screen and (max-width: 767px) {
		.timeline {
			padding-left: 45px;
		}

		.timeline-marker {
			width: 22px;
			height: 22px;
			left: -52px;
		}
	}
</style>
