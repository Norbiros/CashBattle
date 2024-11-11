<script>
	import { onMount } from 'svelte';
	import { points } from '../stores/points';

	const sectors = [
		{ color: '#f82', label: 'Miejsca' },
		{ color: '#0bf', label: 'Daty' },
		{ color: '#fb0', label: 'Muzyka' },
		{ color: '#0fb', label: 'Postacie' },
	];

	const rand = (m, M) => Math.random() * (M - m) + m;
	const tot = sectors.length;
	const PI = Math.PI;
	const TAU = 2 * PI;
	const arc = TAU / sectors.length;
	const friction = 0.991;

	let angVel = 0;
	let ang = 0;

	let spinEl;
	let canvasEl;
	let ctx;
	let dia;
	let rad;

	const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

	function drawSector(sector, i) {
		const ang = arc * i;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = sector.color;
		ctx.moveTo(rad, rad);
		ctx.arc(rad, rad, rad, ang, ang + arc);
		ctx.lineTo(rad, rad);
		ctx.fill();

		ctx.translate(rad, rad);
		ctx.rotate(ang + arc / 2);
		ctx.textAlign = 'right';
		ctx.fillStyle = '#fff';
		ctx.font = 'bold 20px sans-serif';
		ctx.fillText(sector.label, rad - 10, 10);
		ctx.restore();
	}

	function rotate() {
		const sector = sectors[getIndex()];
		canvasEl.style.transform = `rotate(${ang - PI / 2}rad)`;
		spinEl.style.background = sector.color;
	}

	function frame() {
		if (!angVel) return;
		angVel *= friction;
		if (angVel < 0.002) angVel = 0;
		ang += angVel;
		ang %= TAU;
		rotate();
	}

	function engine() {
		frame();
		requestAnimationFrame(engine);
	}

	onMount(() => {
		ctx = canvasEl.getContext('2d');
		dia = ctx.canvas.width;
		rad = dia / 2;

		sectors.forEach(drawSector);
		rotate();
		engine();

		spinEl.addEventListener('click', () => {
			if (!angVel) angVel = rand(0.25, 0.45);
		});
	});

	let oldSpin = $points.spin;

	$: if ($points.spin !== oldSpin) {
		oldSpin = $points.spin;
		spinEl.click();
	}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #wheelOfFortune {
        display: inline-block;
        position: relative;
        overflow: hidden;
    }

    canvas {
        display: block;
    }

    #spin {
        font: 1.5em/0 sans-serif;
        user-select: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20%;
        height: 20%;
        margin: -10%;
        background: #fff;
        color: #fff;
        box-shadow: 0 0 0 8px currentColor, 0 0 15px 5px rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        transition: 0.1s;
    }

    #spin::after {
        content: '';
        position: absolute;
        top: -17px;
        border: 10px solid transparent;
        border-bottom-color: currentColor;
        border-top: none;
    }
</style>

<div id="wheelOfFortune">
	<canvas bind:this={canvasEl} width="300" height="300"></canvas>
	<div bind:this={spinEl} id="spin"></div>
</div>
