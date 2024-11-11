import { writable } from "svelte/store"
import { browser } from "$app/environment"

interface Points {
  team_one_points: number
  team_one_bidding: number
  team_two_points: number
  team_two_bidding: number
  stakes_previous_round: number
  spin: boolean
}

export const points = writable<Points>({
  team_one_points: 0,
  team_one_bidding: 0,
  team_two_points: 0,
  team_two_bidding: 0,
  stakes_previous_round: 0,
  spin: false,
});

if (browser) {
  window.addEventListener("storage", (event) => {
    if (event.key === "data" && event.newValue !== null) {
      points.set(JSON.parse(event.newValue));
    }
  });
}