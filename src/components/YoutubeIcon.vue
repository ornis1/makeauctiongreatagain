<template>
	<div :class="{ search: loading }">
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn icon large @click="setVideo" v-on="on">
					<v-icon :color="item.video ? '#ff0000' : 'grey'">
						mdi-youtube
					</v-icon>
				</v-btn>
			</template>
			<span>Показать трейлер</span>
		</v-tooltip>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import tmdb from "@/helpers/tmdb.ts";
import { data } from "@/store/tableData";

@Component({
	name: "YoutubeIcon.vue"
})
export default class YoutubeIcon extends Vue {
	@Prop({ required: true, default: "" }) item!: data;

	loading = false;
	timeoutId: number | null = null;

	mounted() {
		this.getKey();
	}
	/** Добавляет в store данные о фильме. Нужно для youtube компонента */
	setVideo() {
		this.$store.commit("tableData/SET_SELECTED_ITEM", this.item);
	}
	async getKey() {
		this.loading = true;
		// Или ключ или пустая строка
		const key: string = await tmdb.getTrailerKey(this.item.title);
		this.$store.dispatch("tableData/change", { id: this.item.id, video: key });
		this.loading = false;
	}
	// Обновляем ключ на видео когда меняют название фильма
	@Watch("item.title")
	handler() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
		this.timeoutId = setTimeout(() => {
			this.getKey();
		}, 1000);
	}
}
</script>

<style lang="stylus" scoped>
.search {
	position relative
	&:after {
		position absolute
		top 0
		z-index 2
		right 0
		left 0
		bottom 0
		display flex
		justify-content center
		align-items center
		content '🔍'
		width 100%
		height 100%
		animation rot 2s infinite linear
	}
}
@keyframes rot {
	from {
		transform: rotate(0deg)	translate(-5px)	rotate(0deg);
	}
	to {
		transform: rotate(360deg) translate(-5px) rotate(-360deg);
	}
}
</style>
