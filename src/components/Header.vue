<template>
	<v-app-bar app class="d-flex align-center justify-end" dark>
		<v-btn
			color="#ff9a42"
			outlined
			rounded
			x-large
			:ripple="false"
			class="button"
			@click="online ? logout() : api.login()"
		>
			<v-icon class="mr-2" v-show="online">
				mdi-exit-to-app
			</v-icon>
			<v-img class="mr-2" :src="logoSrc" v-show="!online"></v-img>
			<span class="body">
				{{ online ? "Выйти " : "Войти" }}
			</span>
		</v-btn>
	</v-app-bar>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
import donationAlertsApi from "@/helpers/donationAlertsApi";
import { mapGetters } from "vuex";
import { Component, Vue } from "vue-property-decorator";

@Component({
	name: "Header",
	computed: {
		...mapGetters("user", ["online"])
	}
})
export default class Header extends Vue {
	token: string = this.$store.getters["user/token"];
	api = new donationAlertsApi().init(this.token);
	logoSrc = require("@/assets/da.png");

	async logout() {
		const Cookies = await import("js-cookie");

		Cookies.remove("token");
		this.$store.commit("user/SET_ACCESS_TOKEN", null);
		this.api.logout();
	}
}
</script>

<style lang="stylus" scoped>
.button {
	border-width 2px
	font-weight 600
}
</style>
