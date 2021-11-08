<template>
<div class="search-container">
    <SearchHeader
      @search="search"
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
        results: []
    }},
    created() {
        console.log('Home -> Created.');
        this.search('');
    },
    methods: {
        async search(query) {
            console.log(`Home -> Searching for '${query}'`);
            let response = null;
            if (query.length) {
                response = await getByName(query);
            } else {
                response = await getAll('flags', 'name', 'population', 'region',  'capital');
            }
            const results = await response.json();
            console.log(`Home -> Successfuly fetched results.`);
            this.results = results;
        }
    }
}
</script>


<style scoped>

</style>