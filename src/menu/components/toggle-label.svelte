<script>
	import { createEventDispatcher } from 'svelte';

	export let expanded = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('toggle');
	}
</script>

<style>
	.label {
		display: flex;
		line-height: 20px;
		user-select: none;
		align-items: center;
	}
	.icon {
		display: inline-block;
		width: 25px;
		color: #777;
	}

	.label:active .icon,
	.icon:active {
		color: black;
	}
</style>

<h3 class="label" on:click={handleClick}>
	<span class="icon">
		{#if expanded}▼{:else}▶{/if}
	</span>
	<slot />
</h3>
