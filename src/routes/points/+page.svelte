<script>
	import { points } from '../../stores/points';
	import Wheel from '../../components/Wheel.svelte';
	import TableRow from '../../components/TableRow.svelte';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100">
	<div class="mb-5 mt-4 w-1/2 rounded-lg bg-gray-800 px-10 py-5 text-center">
		<div class="mb-5">
			<h1 class="text-3xl font-bold">Awantura o Kasę</h1>
			<h1>powered by CrabCraft</h1>
		</div>
		<Wheel />
		<table class="mt-3 min-w-full table-auto border border-gray-700 bg-gray-700 text-center">
			<thead>
				<tr class="text-lg font-semibold">
					<th class="px-4 py-2"></th>
					<th class="px-4 py-2">Grupa 1</th>
					<th class="px-4 py-2">Grupa 2</th>
				</tr>
			</thead>
			<tbody>
				<TableRow
					label="Stan Konta"
					teamOneValue={($points.team_one_points - $points.team_one_bidding) * 100}
					teamTwoValue={($points.team_two_points - $points.team_two_bidding) * 100}
				/>
				<TableRow
					label="Licytacja"
					teamOneValue={$points.team_one_bidding * 100}
					teamTwoValue={$points.team_two_bidding * 100}
				/>
			</tbody>
		</table>
		<div class="mt-5 w-full text-center">
			Pula
			<span class="font-bold">
				{($points.stakes_previous_round + $points.team_one_bidding + $points.team_two_bidding) *
					100}
			</span>
		</div>
		{#if $points.time !== 0}
			<span>Czas na odpowiedź: <strong class="font-bold">{$points.time}</strong></span>
		{/if}
	</div>
</div>
