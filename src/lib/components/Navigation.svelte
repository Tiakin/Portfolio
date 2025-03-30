<script>
	export let activeSection;

	const navigateTo = (section) => {
		activeSection = section;
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
</script>

<div class="navbar-gradient"></div>

<nav class="fixed top-0 z-50 flex w-full justify-center bg-black/20 py-7 backdrop-blur-md">
	<button
		class={`mx-6 cursor-pointer rounded-full border-none bg-white/10 px-10 py-5 text-2xl text-white transition-colors duration-300 ${activeSection === 'Présentation' ? 'bg-white/30' : 'hover:bg-white/30'}`}
		on:click={() => navigateTo('Présentation')}
	>
		Présentation
	</button>
	<button
		class={`mx-6 cursor-pointer rounded-full border-none bg-white/10 px-10 py-5 text-2xl text-white transition-colors duration-300 ${activeSection === 'Mes compétences' ? 'bg-white/30' : 'hover:bg-white/30'}`}
		on:click={() => navigateTo('Mes compétences')}
	>
		Mes compétences
	</button>
	<button
		class={`mx-6 cursor-pointer rounded-full border-none bg-white/10 px-10 py-5 text-2xl text-white transition-colors duration-300 ${activeSection === 'Mes projets' ? 'bg-white/30' : 'hover:bg-white/30'}`}
		on:click={() => navigateTo('Mes projets')}
	>
		Mes projets
	</button>
</nav>

<style>
	.navbar-gradient {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: linear-gradient(to bottom, rgba(11, 0, 80, 0.4) 0%, transparent 70%);
		z-index: -5;
	}
</style>
