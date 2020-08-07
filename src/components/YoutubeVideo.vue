<template>
	<div>
		<div class="d-flex justify-space-between">
			<span>Потрачено {{ wastedTime }}</span>
			<h4>Трейлер</h4>
			<span>Собрано: {{ $store.getters["tableData/total"] }}</span>
		</div>
		<div class="video" ref="video">
			<iframe
				v-if="src && video"
				:src="src"
				frameborder="0"
				width="100%"
				height="100%"
				allowfullscreen
				class="iframe"
			></iframe>
			<div class="link__wrapper" v-if="!video && item && item.title">
				<a
					v-if="!video"
					target="_blank"
					:href="
						`https://www.youtube.com/results?search_query=${item.title}+трейлер`
					"
					class="fill-height text-h3 d-flex justify-center align-center"
				>
					Найти на youtube
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { data } from "@/store/tableData";

@Component({
	name: "YoutubeVideo"
})
export default class YoutubeVideo extends Vue {
	active = false;
	startTime: null | number = null;
	intervalId: number | undefined;
	wastedTime = "00:00";

	get item(): data {
		return this.$store.getters["tableData/selectedItem"];
	}

	get video(): string {
		return this.item?.video ? this.item.video : "";
	}

	get src(): string {
		if (this.item === null) {
			return "";
		}
		return this.generateURL(this.video);
	}

	generateURL(id: string): string {
		const query = "?rel=0&showinfo=0";
		return "https://www.youtube.com/embed/" + id + query;
	}

	setWastedTime(): void {
		if (this.startTime === null) return;

		const date = new Date(Date.now() - this.startTime);
		const h = `00${date.getUTCHours()}`.slice(-2);
		const m = `00${date.getUTCMinutes()}`.slice(-2);
		const s = `00${date.getUTCSeconds()}`.slice(-2);

		if (date.getUTCHours()) {
			this.wastedTime = `${h}:${m}:${s}`;
			return;
		}

		this.wastedTime = `${m}:${s}`;
	}
	beforeMount() {
		this.startTime = Date.now();
	}
	mounted() {
		this.intervalId = setInterval(() => this.setWastedTime(), 500);
	}
	destroyed() {
		clearInterval(this.intervalId);
	}
}
</script>

<style scoped>
.video {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
	background-color: #000000;
}

.video__link {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.video__media {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: none;
}

.video__button {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 1;
	display: block;
	padding: 0;
	width: 68px;
	height: 48px;
	border: none;
	background-color: transparent;
	transform: translate(-50%, -50%);
	cursor: pointer;
}

.video__button-shape {
	fill: #212121;
	fill-opacity: 0.8;
}

.video__button-icon {
	fill: #ffffff;
}

.video__button:focus {
	outline: none;
}

.video:hover .video__button-shape,
.video__button:focus .video__button-shape {
	fill: #ff0000;
	fill-opacity: 1;
}

.iframe {
	position: absolute;
}
.link__wrapper {
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	font-size: 2rem;
	justify-content: center;
	align-items: center;
	top: 0;
	bottom: 0;
}
</style>
