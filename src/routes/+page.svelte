<script>
	import Navigation from '../lib/components/Navigation.svelte';
	import Presentation from '../lib/components/Presentation.svelte';
	import Competences from '../lib/components/Competences.svelte';
	import Projets from '../lib/components/Projets.svelte';

	let activeSection = 'Présentation';
	let observer;

	import { onMount } from 'svelte';
	
	onMount(() => {
		// Special handling for section detection that works with nested sections
		const handleScroll = () => {
			// Get positions of all main sections
			const presentationSection = document.getElementById('Présentation');
			const competencesSection = document.getElementById('Mes compétences');
			const projetsSection = document.getElementById('Mes projets');
			
			if (!presentationSection || !competencesSection || !projetsSection) return;
			
			const presentationTop = presentationSection.offsetTop;
			const competencesTop = competencesSection.offsetTop;
			const projetsTop = projetsSection.offsetTop;
			const documentHeight = document.body.scrollHeight;
			
			const scrollPos = window.scrollY + window.innerHeight/2;
			
			if (scrollPos >= projetsTop) {
				activeSection = 'Mes projets';
			} else if (scrollPos >= competencesTop) {
				activeSection = 'Mes compétences';
			} else {
				activeSection = 'Présentation';
			}
		};
		
		handleScroll();
		
		let scrollTimeout;
		window.addEventListener('scroll', () => {
			if (!scrollTimeout) {
				scrollTimeout = setTimeout(() => {
					handleScroll();
					scrollTimeout = null;
				}, 100);
			}
		});
		
		window.addEventListener('resize', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
			clearTimeout(scrollTimeout);
		};
	});
</script>

<main class="overflow-hidden">
	<Navigation {activeSection} />

	<Presentation />

	<Competences />

	<Projets />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: white;
		position: relative;
	}
</style>
