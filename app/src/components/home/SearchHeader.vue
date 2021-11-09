<template>
<div class="page-header">
    <TextInput
      :placeholder="'Search for a country...'"
      @search="search"
    ></TextInput>
    <Dropdown
      :text="'Filter by Region'"
      :items="continents"
      @selected="filterRegion"
      @deselected="filterRegion(null)"
    ></Dropdown>
</div>
</template>


<script>
import Dropdown from '../Dropdown.vue';
import TextInput from '../SearchBar.vue';

export default {
    name: 'SearchHeader',
    components: {
        Dropdown,
        TextInput
    },
    props: [ ],
    data() { return {
        filteredRegion: null,
        continents: [
            'Africa', 'Americas', 'Asia',
            'Europe', 'Oceania'
        ]
    }},
    methods: {
        filterRegion(region) {
            this.filteredRegion = region;
            this.$emit('filter-region', region);
        },
        search(query) {
            this.$emit('search', query);
        }
    }
}
</script>


<style scoped>

.page-header {
    font-size: 14rem;
    display: flex;
    justify-content: space-between;
    gap: 10rem;
}

.dropdown {
    flex-shrink: 0;
}

</style>