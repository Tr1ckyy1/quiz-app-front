<template>
  <h2 class="text-blue-main font-semibold">Sort by</h2>
  <FilterSortingListItem name="A-Z"><FilterArrowUp /></FilterSortingListItem>
  <FilterSortingListItem name="Z-A"><FilterArrowDown /></FilterSortingListItem>
  <FilterSortingListItem name="Most popular"><FilterPopular /></FilterSortingListItem>
  <FilterSortingListItem name="Newest"><FilterNewest /></FilterSortingListItem>
  <FilterSortingListItem name="Oldest"><FilterOldest /></FilterSortingListItem>
</template>

<script>
import FilterSortingListItem from './FilterSortingListItem.vue'
import FilterArrowUp from '@/icons/filterBy/FilterArrowUp.vue'
import FilterArrowDown from '@/icons/filterBy/FilterArrowDown.vue'
import FilterPopular from '@/icons/filterBy/FilterPopular.vue'
import FilterNewest from '@/icons/filterBy/FilterNewest.vue'
import FilterOldest from '@/icons/filterBy/FilterOldest.vue'
export default {
  components: {
    FilterSortingListItem,
    FilterArrowUp,
    FilterArrowDown,
    FilterPopular,
    FilterNewest,
    FilterOldest
  }
}
</script>
