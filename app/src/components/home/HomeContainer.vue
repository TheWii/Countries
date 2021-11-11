<template>
<div class="home container"
  :class="{ active }"
>
    <SearchHeader
      @search="search"
      @filter-region="setFilterRegion"
    ></SearchHeader>
    <SearchResults
      :results="results"
      @open-result="openResult"
    ></SearchResults>
</div>
</template>


<script>
import SearchHeader from './SearchHeader.vue';
import SearchResults from './SearchResults.vue';

import { getAll, getByName, getByCode } from '../../services/CountryService.js';

export default {
    name: 'HomeContainer',
    components: {
        SearchHeader,
        SearchResults
    },
    props: [ 'activeContainer' ],
    data() { return {
        id: 'home',
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
                'region', 'capital', 'cca3'
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
        },

        async openResult(result) {
            console.log(`Home -> Fetching country: ${result.cca3}`);
            const country = await getByCode(result.cca3);
            if (!country) {
                console.log(`Fetch failed.`);
                return;
            }
            console.log(`Fetch completed.`);
            this.$emit('open-result', country);
        }
    }
}
</script>


<style scoped>

.container {
    display: none;
    /*animation-name: hide;
    animation-duration: 1s;*/
}
.container.active {
    display: block;
    /*animation-name: show;*/
}

@keyframes hide {
    from {
        position: initial;
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}

@keyframes show {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

</style>