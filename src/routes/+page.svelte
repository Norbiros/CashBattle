<script>
	import { points } from "../stores/points";
	import { browser } from '$app/environment';


	function updatePoints() {
		if (browser && $points !== null) {
			localStorage.setItem("data", JSON.stringify($points));
		}
	}

	function lose() {
		$points.team_one_points -= $points.team_one_bidding;
		$points.team_two_points -= $points.team_two_bidding;
		$points.stakes_previous_round += $points.team_one_bidding + $points.team_two_bidding;

		$points.team_one_bidding = 0;
		$points.team_two_bidding = 0;
		updatePoints();
	}

	function teamOneWon() {
		lose();
		$points.team_one_points += $points.stakes_previous_round;
		$points.stakes_previous_round = 0;
		updatePoints();
	}

	function teamTwoWon() {
		lose();
		$points.team_two_points += $points.stakes_previous_round;
		$points.stakes_previous_round = 0;
		updatePoints();
	}

	function spin() {
		$points.spin = !$points.spin;
		updatePoints()
	}

	function newBidding() {
		$points.team_one_bidding = 5;
		$points.team_two_bidding = 5;
		updatePoints()
	}
</script>

<div class="p-6 bg-gray-100 max-w-md mx-auto rounded-lg shadow-md">
	<div class="space-y-4">
		<h2 class="text-xl font-bold text-center">Grupa 1</h2>
		<div class="flex space-x-2">
			<input type="number" bind:value={$points.team_one_points} on:input={updatePoints} class="w-1/2 p-2 border border-gray-300 rounded-md"/>
			<input type="number" bind:value={$points.team_one_bidding} on:input={updatePoints} class="w-1/2 p-2 border border-gray-300 rounded-md"/>
		</div>

		<h2 class="text-xl font-bold text-center">Grupa 2</h2>
		<div class="flex space-x-2">
			<input type="number" bind:value={$points.team_two_points} on:input={updatePoints} class="w-1/2 p-2 border border-gray-300 rounded-md"/>
			<input type="number" bind:value={$points.team_two_bidding} on:input={updatePoints} class="w-1/2 p-2 border border-gray-300 rounded-md"/>
		</div>

		<h2 class="text-xl font-bold text-center">Z poprzedniej rundy</h2>
		<input type="number" bind:value={$points.stakes_previous_round} on:input={updatePoints} class="w-full p-2 border border-gray-300 rounded-md"/>

		<div class="text-lg font-semibold mt-4 text-center">
			Pula: <span>{($points.stakes_previous_round + $points.team_one_bidding + $points.team_two_bidding) * 100}</span>
		</div>
	</div>

	<div class="flex flex-col space-y-2 mt-6">
		<button on:click={lose} class="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Źle odpowiedzieli</button>
		<button on:click={teamOneWon} class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Drużyna 1 wygrała</button>
		<button on:click={teamTwoWon} class="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Drużyna 2 wygrała</button>
		<button on:click={spin} class="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Zakręć</button>
		<button on:click={newBidding} class="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">Nowa obstawianie</button>
	</div>
</div>