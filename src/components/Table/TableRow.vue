<template>
	<tr>
		<td>
			<slot></slot>
		</td>
		<td>
			<v-text-field
				type="text"
				class="input "
				hide-details
				solo
				flat
				dense
				:value="item.title"
				v-model="title"
				@input="changeTitle(item.id)"
			/>
		</td>
		<td class="text-center">{{ item.amount }}</td>
		<td>
			<div class="d-flex align-center">
				<v-text-field
					type="number"
					class="input d-table-cell mr-2"
					hide-details
					solo
					dense
					v-model="value"
					@keypress.enter="increment(item.id)"
					autocomplete="off"
				/>
			</div>
		</td>
		<td>
			<v-btn text icon @click="increment(item.id)">
				<v-icon large>
					mdi-plus
				</v-icon>
			</v-btn>
		</td>
		<td>
			<YoutubeIcon :item="item" />
		</td>
	</tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { data } from "@/store/tableData";

@Component({
	components: {
		YoutubeIcon: () => import("@/components/YoutubeIcon.vue")
	}
})
export default class TableRow extends Vue {
	@Prop() readonly item!: data;
	value: string | null = null;
	title = this.item.title;

	increment(id: number) {
		if (this.value === null) return;
		const value = +this.value;
		this.value = null;
		if (value) {
			this.$store.dispatch("tableData/change", { id, amount: value });
		}
	}
	changeTitle(id: number) {
		if (this.title) {
			this.$store.dispatch("tableData/change", { id, title: this.title });
		}
	}
}
</script>

<style lang="stylus" scoped>
>>>.v-text-field__slot  {
		& input {
			text-align center
			&:focus {
				background-color transparent !important
			}
			&::-webkit-inner-spin-button {
				display: none;
			}
		}

	background-color transparent
}
</style>
