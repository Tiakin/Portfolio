<script>
	import Navigation from '../lib/components/Navigation.svelte';
	import Presentation from '../lib/components/Presentation.svelte';
	import Competences from '../lib/components/Competences.svelte';
	import Projets from '../lib/components/Projets.svelte';

	let activeSection = 'Présentation';

	import { onMount } from 'svelte';
	onMount(() => {});
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
