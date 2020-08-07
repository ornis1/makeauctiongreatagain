<template>
	<div class="timer">
		<div class="timer__buttons d-flex justify-space-between">
			<v-btn
				fab
				x-large
				solo
				color="success"
				@click="handleClick"
				:disabled="!time"
			>
				{{ intervalId ? "Пауза" : "Старт" }}
			</v-btn>
			<div
				:class="['timer__clock', 'text-h2', { 'timer__clock--alarm': alarm }]"
			>
				{{ formatedTime.minutes }}
				<span :class="[{ timer__dots: intervalId }, 'ml-n1', 'mr-n1']">
					:
				</span>
				{{ formatedTime.seconds }}
				<span class="ml-n2 mr-n2">.</span>
				{{ formatedTime.milliseconds }}
			</div>
			<v-btn :disabled="!disabled" fab x-large color="error" @click="stop">
				Stop
			</v-btn>
		</div>

		<div class="timer__buttons mt-2 d-flex justify-space-between">
			<v-btn
				v-for="(btn, index) in buttons"
				:key="index"
				solo
				x-large
				dark
				class="d-flex flex-grow-1 mr-2"
				@click="btn.handler"
			>
				{{ btn.text }}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	name: "Timer"
})
export default class Timer extends Vue {
	/* Data */
	readonly buttons = [
		{ text: "+1", handler: () => this.increment(1) },
		{ text: "+2", handler: () => this.increment(2) },
		{ text: "=10", handler: () => this.equal(10) },
		{ text: "-1", handler: () => this.increment(-1) }
	];
	time = 0;
	intervalId: null | number = null;
	alarm = false;
	/* Methods */
	equal(value: number): void {
		this.time = this.getMinutesInMilleseconds(value);
	}
	increment(value: number): void {
		this.time += this.getMinutesInMilleseconds(value);
	}
	start() {
		this.intervalId = setInterval(this.loop, 5);
	}
	pause(): void {
		if (this.intervalId) clearInterval(this.intervalId);
		this.intervalId = null;
	}
	stop(): void {
		if (this.intervalId) clearInterval(this.intervalId);
		this.intervalId = null;
		this.time = 0;
		this.alarm = false;
	}
	getMinutesInMilleseconds(value: number): number {
		return 60000 * value;
	}
	handleClick() {
		this.intervalId ? this.pause() : this.start();
	}
	loop() {
		const time = this.endTime - Date.now();
		// Half a minute in milliseconds
		const half = this.getMinutesInMilleseconds(0.5);

		// Times out
		if (time < 0) {
			this.stop();
			setTimeout(
				() => alert(`Победитель ${this.$store.getters["tableData/winner"]}`),
				0
			);
			return;
		}
		// set time
		this.time = time;

		// Turn on when 30 seconds remain
		if (!this.alarm && time <= half) {
			this.alarm = true;
		}
		if (this.alarm && time > half) {
			this.alarm = false;
		}
	}
	destroyed() {
		this.stop();
	}
	/* Computed */
	get formatedTime() {
		const date = new Date(this.time);
		const minutes = `0${date.getMinutes()}`.slice(-2);
		const seconds = `0${date.getSeconds()}`.slice(-2);
		const milliseconds = `00${date.getMilliseconds()}`.slice(-3);
		return { minutes, seconds, milliseconds };
	}
	get disabled(): boolean {
		return Boolean(this.intervalId);
	}
	get endTime() {
		return this.time + Date.now();
	}
}
</script>
<style lang="stylus" scoped>
.timer__dots {
	animation fade .25s infinite linear alternate;
}
.timer__clock--alarm {
	animation fade .5s infinite ease-in alternate;
	color red
}
@keyframes fade {
	from {
		opacity .6
	}
	to {
		opacity 0
	}
}
</style>
