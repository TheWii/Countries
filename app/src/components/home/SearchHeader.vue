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
        continents: [
            'Africa', 'America', 'Asia',
            'Europe', 'Oceania'
        ]
    }},
    methods: {
        filterRegion(region) {
            console.log(`Filtering for ${region}.`);
        },
        search(query) {
            console.log(`Searching for '${query}'`);
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

</style>