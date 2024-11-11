<script>
	import { points } from "../stores/points";
	import { browser } from '$app/environment';


	points.subscribe((val) => {
		if (browser && val !== null) {
			localStorage.setItem("data", JSON.stringify(val));
		}
	});

	function lose() {
		// Local calculations
		$points.team_one_points -= $points.team_one_bidding;
		$points.team_two_points -= $points.team_two_bidding;
		$points.stakes_previous_round += $points.team_one_bidding + $points.team_two_bidding;

		// Reset bids
		$points.team_one_bidding = 0;
		$points.team_two_bidding = 0;
	}

	function teamOneWon() {
		lose();
		// Award points to Team 1
		$points.team_one_points += $points.stakes_previous_round;
		$points.stakes_previous_round = 0;  // Reset
	}

	function teamTwoWon() {
		lose();
		// Award points to Team 2
		$points.team_two_points += $points.stakes_previous_round;
		$points.stakes_previous_round = 0;  // Reset
	}

	function spin() {
		$points.spin = !$points.spin;
	}
</script>

<style>
    input {
        background: #888888;
    }
</style>

Grupa 1
<input type="number" bind:value={$points.team_one_points} />
<input type="number" bind:value={$points.team_one_bidding} />
<br />
Grupa 2
<input type="number" bind:value={$points.team_two_points} />
<input type="number" bind:value={$points.team_two_bidding} />
<br />
Z poprzedniej rundy
<input type="number" bind:value={$points.stakes_previous_round} />

<button on:click={lose}>Źle odpowiedzieli</button>
<button on:click={teamOneWon}>Drużyna 1 wygrała</button>
<button on:click={teamTwoWon}>Drużyna 2 wygrała</button>
<button on:click={spin}>Łiii</button>

Pula <p>{($points.stakes_previous_round + $points.team_one_bidding + $points.team_two_bidding) * 100}</p>
