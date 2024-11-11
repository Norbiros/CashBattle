<script lang="ts">
	export let label: string;
	export let teamOneValue: string;
	export let teamTwoValue: string;
</script>

<tr class="border-b border-gray-700 bg-gray-800">
	<td class="px-4 py-3 font-medium">{label}</td>
	<td class="px-4 py-3 text-teal-400">{teamOneValue}</td>
	<td class="px-4 py-3 text-yellow-400">{teamTwoValue}</td>
</tr>
