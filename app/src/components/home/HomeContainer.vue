<template>
<div class="search-container">
    <SearchHeader
      @search="search"
      @filter-region="setFilterRegion"
    ></SearchHeader>
    <SearchResults
      :results="results"
    ></SearchResults>
</div>
</template>


<script>
import SearchHeader from './SearchHeader.vue';
import SearchResults from './SearchResults.vue';

import { getAll, getByName } from '../../services/CountryService.js';

export default {
    name: 'HomeContainer',
    components: {
        SearchHeader,
        SearchResults
    },
    data() { return {
        lastQuery: '',
        results: [],
        filterProps: {}
    }},
    computed: {
        active() {
            return this.id === this.activeContainer;
        }
    },
    created() {
        console.log('Home -> Created.');
        this.search();
    },
    methods: {
        async search(input='') {
            console.log(`Home -> Searching for '${input}'`);
            const properties = [
                'flags', 'name', 'population',
                'region', 'capital'
            ];
            this.results = await this.query(input, properties);
            console.log(`Home -> Search completed.`);
        },

        async query(input=null, properties=[]) {
            if (input === null) input = this.lastQuery;
            this.lastQuery = input;
            const results = input.length ?
                await getByName(input, properties) :
                await getAll(properties);
            return this.getFiltered(results);
        },

        getFiltered(results) {
            return results.filter(result => {
                for (let prop in this.filterProps) {
                    if (result[prop] !== this.filterProps[prop]) return false;
                }
                return true;
            });
        },

        setFilterProperty(prop, value) {
            console.log(`Set filter property '${prop}' to ${value}.`);
            this.filterProps[prop] = value;
        },
        removeFilterProperty(prop) {
            console.log(`Removed filter property '${prop}'.`);
            delete this.filterProps[prop];
        },

        setFilterRegion(region) {
            if (region) this.setFilterProperty('region', region);
            else this.removeFilterProperty('region');
            this.search(this.lastQuery);
        }
    }
}
</script>


<style scoped>

</style>