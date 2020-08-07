<template>
	<v-app>
		<Header />
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	name: "App",
	components: {
		Header: () => import("@/components/Header.vue")
	},
	async created() {
		const Cookies = await import("js-cookie");
		const token = Cookies.get("token");
		if (token) {
			this.$store.commit("user/SET_ACCESS_TOKEN", token);
		}
	}
})
export default class App extends Vue {}
</script>

<style lang="stylus">
* {
	outline: none !important
}
</style>
