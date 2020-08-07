<template>
	<div></div>
</template>

<script lang="ts">
import querystring from "querystring";
import { Vue, Component } from "vue-property-decorator";

@Component({
	name: "Callback"
})
export default class Callback extends Vue {
	async created() {
		const { hash } = this.$route;
		if (hash) {
			const {
				access_token: accessToken,
				token_type: tokenType
			}: {
				access_token: string;
				token_type: string;
			} = querystring.parse(hash.slice(1));

			if (accessToken && tokenType === "Bearer") {
				const Cookies = await import("js-cookie");

				Cookies.set("token", accessToken);
				this.$store.commit("user/SET_ACCESS_TOKEN", accessToken);
			}
		}
		this.$router.push("/");
	}
}
</script>
