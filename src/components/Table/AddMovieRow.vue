<style lang="stylus" scoped>
.col__input {
	grid-column 3 span
}
.col__button {
	grid-column 3 span
}
.button {
	&:hover {
		color #2a2a2a
	}
}
>>>.v-text-field__slot  {
		& input {
			text-align center
			&:focus {
				background-color transparent !important
			}
		}
}
</style>

<template>
	<tr>
		<td class="col__input">
			<v-text-field
				v-model="input"
				@keypress.enter="add"
				autocomplete="off"
				solo
				dense
				hide-details=""
			></v-text-field>
		</td>
		<td class="col__button">
			<button class="ml-5 button" @click="add">
				Добавить
			</button>
		</td>
	</tr>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { data } from "@/store/tableData";

@Component({
	name: "AddMovie.vue"
})
export default class AddMovie extends Vue {
	input = "";
	add(): void {
		if (!this.input) return;

		const payload: data = {
			id: Date.now(),
			title: this.input,
			amount: 0,
			video: ""
		};
		this.$store.dispatch("tableData/addData", payload);
		this.input = "";
	}
}
</script>
