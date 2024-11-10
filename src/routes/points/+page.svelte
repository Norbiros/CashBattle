<script>
	import { points } from "../../stores/points"
</script>

<div class="bg-gray-900 flex items-center justify-center min-h-screen">
	<div class="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6">
		<div class="text-center w-full mb-5">
			<h1 class="font-bold text-3xl">Awantura o Kasę</h1>
			<h1>powered by CrabCraft</h1>
		</div>
		<table class="min-w-full text-center table-auto border border-gray-700">
			<thead>
				<tr>
					<th class="px-4 py-2 text-lg font-semibold border-b border-gray-700"></th>
					<th class="px-4 py-2 text-lg font-semibold border-b border-gray-700">Drużyna 1</th>
					<th class="px-4 py-2 text-lg font-semibold border-b border-gray-700">Drużyna 2</th>
				</tr>
			</thead>
			<tbody>
				<tr class="bg-gray-700">
					<td class="px-4 py-3 border-b border-gray-700 font-medium">Stan Konta</td>
					<td class="px-4 py-3 border-b border-gray-700 text-teal-400">{($points.team_one_points - $points.team_one_bidding) * 100}</td>
					<td class="px-4 py-3 border-b border-gray-700 text-yellow-400">{($points.team_two_points - $points.team_two_bidding) * 100}</td>
				</tr>
				<tr class="bg-gray-800">
					<td class="px-4 py-3 border-b border-gray-700 font-medium">Licytacja</td>
					<td class="px-4 py-3 border-b border-gray-700 text-teal-400">{$points.team_one_bidding * 100}</td>
					<td class="px-4 py-3 border-b border-gray-700 text-yellow-400">{$points.team_two_bidding * 100}</td>
				</tr>
			</tbody>
		</table>
		<div class="text-center w-full mt-5">Pula <span class="font-bold">{($points.stakes_previous_round + $points.team_one_bidding + $points.team_two_bidding) * 100}</span></div>
	</div>
</div>

Pula <p>{($points.stakes_previous_round + $points.team_one_bidding + $points.team_two_bidding) * 100}</p>
