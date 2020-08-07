<template>
	<v-container>
		<v-row>
			<v-col cols="7">
				<Table />
			</v-col>
			<v-col>
				<div class="grid">
					<YoutubeVideo />
					<Timer />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	name: "Home",
	components: {
		Table: () => import("@/components/Table/Table.vue"),
		YoutubeVideo: () => import("@/components/YoutubeVideo.vue"),
		Timer: () => import("@/components/Timer.vue")
	}
})
export default class Home extends Vue {}
</script>
<style lang="stylus" scoped>
.grid {
	display grid
	grid-template-columns 1fr
	grid-template-rows repeat(3, minmax(min-content, max-content))
	grid-row-gap 24px
}
</style>
