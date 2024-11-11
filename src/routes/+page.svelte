<script lang="ts">
	import { points } from '../stores/points';
	import { browser } from '$app/environment';
	import Button from '../components/Button.svelte';

	let timerInterval: number | undefined = undefined;

	function fixNumbers() {
		$points.team_one_points = parseInt($points.team_one_points);
		$points.team_two_points = parseInt($points.team_two_points);
		$points.team_one_bidding = parseInt($points.team_one_bidding);
		$points.team_two_bidding = parseInt($points.team_two_bidding);
		$points.stakes_previous_round = parseInt($points.stakes_previous_round);
	}

	function updatePoints() {
		if (browser) {
			fixNumbers();
			localStorage.setItem('data', JSON.stringify($points));
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
		updatePoints();
	}

	function newBidding() {
		$points.team_one_bidding = 5;
		$points.team_two_bidding = 5;
		updatePoints();
	}

	function startTimer() {
		$points.time = 30;
		updatePoints();

		if (timerInterval) clearInterval(timerInterval);

		timerInterval = setInterval(() => {
			if ($points.time > 0) {
				$points.time -= 1;
				updatePoints();
			} else {
				clearInterval(timerInterval);
			}
		}, 1000);
	}

	function clearTimer() {
		clearInterval(timerInterval);
		timerInterval = undefined;
		$points.time = 0;
		updatePoints();
	}
</script>

<div class="mx-auto max-w-md rounded-lg bg-gray-100 p-6 shadow-md">
	<div class="space-y-4">
		<h2 class="text-center text-xl font-bold">Grupa 1</h2>
		<div class="flex space-x-2">
			<input
				type="number"
				bind:value={$points.team_one_points}
				on:input={() => updatePoints()}
				class="w-1/2 rounded-md border border-gray-300 p-2"
			/>
			<input
				type="number"
				bind:value={$points.team_one_bidding}
				on:input={() => updatePoints()}
				class="w-1/2 rounded-md border border-gray-300 p-2"
			/>
		</div>

		<h2 class="text-center text-xl font-bold">Grupa 2</h2>
		<div class="flex space-x-2">
			<input
				type="number"
				bind:value={$points.team_two_points}
				on:input={() => updatePoints()}
				class="w-1/2 rounded-md border border-gray-300 p-2"
			/>
			<input
				type="number"
				bind:value={$points.team_two_bidding}
				on:input={() => updatePoints()}
				class="w-1/2 rounded-md border border-gray-300 p-2"
			/>
		</div>

		<h2 class="text-center text-xl font-bold">Z poprzedniej rundy</h2>
		<input
			type="number"
			bind:value={$points.stakes_previous_round}
			on:input={() => updatePoints()}
			class="w-full rounded-md border border-gray-300 p-2"
		/>

		<div class="mt-4 text-center text-lg font-semibold">
			Pula: <span
				>{($points.stakes_previous_round + $points.team_one_bidding + $points.team_two_bidding) *
					100}</span
			>
		</div>
	</div>

	<div class="mt-6 flex flex-col space-y-2">
		<Button onClick={lose} color="bg-red-500" text="Złe odpowiedzi" />
		<Button onClick={teamOneWon} color="bg-blue-500" text="Drużyna 1 wygrała" />
		<Button onClick={teamTwoWon} color="bg-green-500" text="Drużyna 2 wygrała" />
		<Button onClick={spin} color="bg-yellow-500" text="Zakręć" />
		<Button onClick={newBidding} color="bg-purple-500" text="Nowe obstawianie" />
		<Button onClick={startTimer} color="bg-orange-500" text="Rozpocznij timer" />
		<Button onClick={clearTimer} color="bg-gray-500" text="Wyczyść timer" />
	</div>
</div>
