<template>
	<v-simple-table class="">
		<template #default>
			<thead>
				<th></th>
				<th class="text-right">Название</th>
				<th>Собрано</th>
				<th></th>
				<th></th>
				<th></th>
			</thead>
			<tbody>
				<table-row
					v-for="(item, index) in sortedData"
					:key="item.id"
					:item="item"
				>
					{{ index + 1 }}
				</table-row>

				<AddMovieRow />
			</tbody>
		</template>
	</v-simple-table>
</template>

<script lang="ts">
import { data } from "@/store/tableData";
import { Vue, Component } from "vue-property-decorator";

@Component({
	name: "Table",
	components: {
		AddMovieRow: () => import("@/components/Table/AddMovieRow.vue"),
		TableRow: () => import("@/components/Table/TableRow.vue")
	}
})
export default class Table extends Vue {
	get items(): data[] {
		return this.$store.getters["tableData/data"];
	}
	get sortedData(): data[] {
		const items = [...this.items];
		return items.sort((a, b) => b.amount - a.amount);
	}
}
</script>

<style lang="stylus">
table {
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns: min-content 2fr 150px 1fr 50px 50px
}
.theme--dark.v-data-table {
	background-color: transparent !important
}
//
thead,
tbody,
tr {
  display: contents;
}


th,
td {
	border-bottom: 4px solid rgba(255, 255, 255, 0.12) !important
	font-size: 2rem !important
	display: flex
	justify-content: center
	align-items: center
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap;
	border-bottom: 4px solid rgba(255, 255, 255, 0.12);
}
input {
	font-size 2rem
}
</style>
