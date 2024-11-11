<script lang="ts">
	export let color: string = "bg-blue-500";
	export let text: string;
	export let onClick: () => void;
</script>

<button
	on:click={onClick}
	class="w-full rounded-md py-2 text-white hover:opacity-90 {color}"
>
	{text}
</button>
